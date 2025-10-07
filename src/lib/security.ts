// Утилиты безопасности для чата

interface RateLimitEntry {
  requests: number[];
  lastReset: number;
}

class SecurityManager {
  private rateLimits = new Map<string, RateLimitEntry>();
  private readonly maxRequests = 5; // Максимум запросов
  private readonly windowMs = 60000; // За 1 минуту
  
  // 1. Rate Limiting
  checkRateLimit(identifier: string): { allowed: boolean; reason?: string } {
    const now = Date.now();
    const entry = this.rateLimits.get(identifier) || { requests: [], lastReset: now };
    
    // Очищаем старые запросы
    entry.requests = entry.requests.filter(time => now - time < this.windowMs);
    
    if (entry.requests.length >= this.maxRequests) {
      this.logSuspiciousActivity(identifier, `Rate limit exceeded: ${entry.requests.length} requests in window`);
      return { allowed: false, reason: 'Rate limit exceeded' };
    }
    
    entry.requests.push(now);
    this.rateLimits.set(identifier, entry);
    
    return { allowed: true };
  }
  
  // 2. Валидация и фильтрация контента
  validateMessage(message: string): { valid: boolean; reason?: string } {
    // Проверка длины
    if (!message || message.trim().length === 0) {
      return { valid: false, reason: 'Empty message' };
    }
    
    if (message.length < 2) {
      return { valid: false, reason: 'Message too short' };
    }
    
    if (message.length > 1000) {
      return { valid: false, reason: 'Message too long' };
    }
    
    // Спам-паттерны
    const spamPatterns = [
      {
        pattern: /(.)\1{4,}/,
        reason: 'Repeated characters spam'
      },
      {
        pattern: /https?:\/\/[^\s]+/gi,
        reason: 'URLs not allowed'
      },
      {
        pattern: /\b(купить|продать|скидка|акция|бесплатно|заработок|деньги|биткоин|crypto|casino|gambling)\b/gi,
        reason: 'Spam keywords detected'
      },
      {
        pattern: /@[a-zA-Z0-9_]+/g,
        reason: 'Social media mentions not allowed'
      },
      {
        pattern: /\+\d{10,}/,
        reason: 'Phone numbers not allowed'
      },
      {
        pattern: /[^\w\s\p{L}\p{M}\p{N}\?!.,\-:;]/gu,
        reason: 'Invalid characters detected'
      }
    ];
    
    for (const { pattern, reason } of spamPatterns) {
      if (pattern.test(message)) {
        return { valid: false, reason };
      }
    }
    
    return { valid: true };
  }
  
  // 4. Проверка honeypot поля
  checkHoneypot(honeypotValue: string): { valid: boolean; reason?: string } {
    if (honeypotValue && honeypotValue.trim().length > 0) {
      return { valid: false, reason: 'Bot detected via honeypot' };
    }
    return { valid: true };
  }
  
  // 6. Логирование подозрительной активности
  logSuspiciousActivity(identifier: string, reason: string, additionalData?: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      identifier,
      reason,
      additionalData
    };
    
    console.log(`[SECURITY ALERT] ${JSON.stringify(logEntry)}`);
    
    // В продакшене можно отправлять в сервис мониторинга
    // this.sendToMonitoring(logEntry);
  }
  
  // Получение IP адреса с учетом прокси
  getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const remoteAddr = request.headers.get('remote-addr');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    return realIP || remoteAddr || 'unknown';
  }
  
  // Создание уникального идентификатора для rate limiting
  createIdentifier(ip: string, userAgent?: string): string {
    const ua = userAgent ? userAgent.substring(0, 50) : '';
    return `${ip}_${Buffer.from(ua).toString('base64').substring(0, 10)}`;
  }
  
  // Полная проверка безопасности
  validateRequest(request: Request, message: string, honeypot?: string): {
    allowed: boolean;
    reason?: string;
    identifier: string;
  } {
    const ip = this.getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    const identifier = this.createIdentifier(ip, userAgent);
    
    // Проверка honeypot
    const honeypotCheck = this.checkHoneypot(honeypot || '');
    if (!honeypotCheck.valid) {
      this.logSuspiciousActivity(identifier, honeypotCheck.reason!, { ip, userAgent });
      return { allowed: false, reason: 'Security check failed', identifier };
    }
    
    // Проверка rate limiting
    const rateLimitCheck = this.checkRateLimit(identifier);
    if (!rateLimitCheck.allowed) {
      return { allowed: false, reason: rateLimitCheck.reason, identifier };
    }
    
    // Проверка контента
    const messageCheck = this.validateMessage(message);
    if (!messageCheck.valid) {
      this.logSuspiciousActivity(identifier, messageCheck.reason!, { message: message.substring(0, 100) });
      return { allowed: false, reason: messageCheck.reason, identifier };
    }
    
    return { allowed: true, identifier };
  }
}

export const securityManager = new SecurityManager();