
import MainLayout from "@/layouts/MainLayout";

const Terms = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              By accessing and using Phant E-commerce Store, you agree to these Terms of Service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of the Service</h2>
            <p>
              Phant E-commerce Store provides a platform that connects users to BuiltByBit, a resource selling/buying platform. 
              We do not directly sell any thing on our website. All transactions are conducted on BuiltByBit 
              and subject to their terms and conditions.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. External Links</h2>
            <p>
              Our website contains links to external websites, primarily BuiltByBit. When you leave our website, 
              you should review the terms and privacy policies of the destination website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Limitation of Liability</h2>
            <p>
              Phant E-commerce Store is not responsible for any losses, damages, or issues that may arise from 
              your use of BuiltByBit or any other external service linked from our website. 
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              All content on the Phant E-commerce Store website, including text, graphics, logos, and images, 
              is the property of Phant E-commerce Store and is protected by copyright law.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes will be effective 
              immediately upon posting on our website. Your continued use of the site after changes are posted 
              constitutes acceptance of the updated terms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at discord.phantwalker.com.
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

export default Terms;
