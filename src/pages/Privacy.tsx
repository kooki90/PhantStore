
import MainLayout from "@/layouts/MainLayout";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              Phant E-commerce Store is committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, and safeguard your information when you visit our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you contact us or subscribe 
              to our newsletter. This may include your name and email address. We also automatically collect 
              certain information about your device and how you interact with our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to operate and improve our website, respond to your comments and 
              questions, and send you information about our services. We do not sell your personal information to 
              third parties.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. External Links and Third Parties</h2>
            <p>
              Our website contains links to BuiltByBit and possibly other external websites. This Privacy Policy 
              does not apply to those websites. When you click on a link to another website, you should 
              read their privacy policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
            <p>
              We use cookies to improve your experience on our website. You can set your browser to refuse 
              all or some browser cookies, but this may prevent some parts of our website from functioning properly.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement measures designed to protect your information. However, no internet transmission 
              is completely secure, and we cannot guarantee the security of information transmitted through 
              our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will post any changes on this page 
              and encourage you to review our Privacy Policy whenever you access our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at contact@yourmail.com.
            </p>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
