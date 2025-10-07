const { getBlogPosts, getBlogPost } = require('./src/lib/blog.ts');

async function testBlogAPI() {
  console.log('Testing blog API...');

  try {
    console.log('\n1. Testing getBlogPosts for Russian locale:');
    const posts = await getBlogPosts('ru');
    console.log(`Found ${posts.length} posts:`, posts.map(p => ({ title: p.title, slug: p.slug })));

    if (posts.length > 0) {
      console.log('\n2. Testing getBlogPost for first post:');
      const post = await getBlogPost('ru', posts[0].slug);
      console.log('Post found:', post ? { title: post.title, contentLength: post.content.length } : 'Not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testBlogAPI();