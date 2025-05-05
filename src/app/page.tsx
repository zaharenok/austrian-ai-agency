import { Hero } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  return (
    <AuroraBackground className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6 shadow-sm backdrop-blur-sm bg-white/10">
            <h3 className="text-xl font-semibold mb-2">ИИ-стратегия</h3>
            <p className="text-muted-foreground">
              Разрабатываем индивидуальную стратегию внедрения ИИ-решений для вашего бизнеса, 
              учитывая особенности отрасли и потребности компании.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 shadow-sm backdrop-blur-sm bg-white/10">
            <h3 className="text-xl font-semibold mb-2">Разработка решений</h3>
            <p className="text-muted-foreground">
              Создаем кастомные ИИ-приложения, интегрируем существующие модели и 
              адаптируем их под ваши бизнес-процессы.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 shadow-sm backdrop-blur-sm bg-white/10">
            <h3 className="text-xl font-semibold mb-2">Обучение команд</h3>
            <p className="text-muted-foreground">
              Обучаем ваших сотрудников эффективно использовать новые ИИ-инструменты и 
              развивать навыки работы с искусственным интеллектом.
            </p>
          </div>
        </div>
      </div>
      
      <footer className="py-10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-spektr-cyan-50">Austrian AI Agency</h2>
              <p className="text-muted-foreground">aaagency.at</p>
            </div>
            
            <div className="flex gap-8">
              <div>
                <h4 className="font-medium mb-2">Контакты</h4>
                <p className="text-muted-foreground">contact@aaagency.at</p>
                <p className="text-muted-foreground">+43 123 456789</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Адрес</h4>
                <p className="text-muted-foreground">Вена, Австрия</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground text-sm">
            © 2025 Austrian AI Agency. Все права защищены.
          </div>
        </div>
      </footer>
    </AuroraBackground>
  );
}
