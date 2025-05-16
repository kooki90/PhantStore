
import MainLayout from "@/layouts/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
            PhantDev is a premier destination for Minecraft server owners and developers.
            Our platform connects you directly to powerful tools, scripts, and bots to elevate your gameplay and community experience.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
            Our mission is to simplify Minecraft development by offering a curated collection of high-quality resources, tools, and bots.
            We believe in making advanced Minecraft customization accessible to everyone, from beginners to experts.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
            <ul className="space-y-2 list-disc pl-5 mb-6">
              <li>Carefully selected premium digital assets</li>
              <li>Direct integration with BuiltByBit exchange</li>
              <li>User-friendly interface designed for simplicity</li>
              <li>Detailed information on each product</li>
              <li>Regular updates with new developing offerings</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p>
            Our team consists of Minecraft developers, plugin creators, and UI/UX specialists
            who are passionate about crafting the best possible tools, experiences, and resources for server owners and digital creators.
            </p>
            
            <div className="mt-8 py-6 border-t border-b">
              <p className="italic">
                "We're building the future of digital asset marketplaces, one block at a time."
              </p>
              <p className="mt-2 font-semibold">— PhantDev Founder</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
