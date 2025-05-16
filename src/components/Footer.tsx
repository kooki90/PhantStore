import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">LightXStudio</h3>
            <p className="text-sm text-muted-foreground">
              Your premium marketplace for minecraft and roblox assets.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-sm hover:text-blue-500 transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-sm hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm hover:text-blue-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="text-sm hover:text-blue-500 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://discord.gg/KPqTQTtdDA" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18.7213 5.11035C17.3516 4.47035 15.8838 4.00035 14.3468 3.75035C14.3218 3.75035 14.2968 3.76035 14.284 3.78035C14.1017 4.09535 13.8957 4.50535 13.7525 4.83035C12.1005 4.60035 10.4613 4.60035 8.84092 4.83035C8.69767 4.49535 8.48492 4.09535 8.30167 3.78035C8.28892 3.76035 8.26392 3.75035 8.23892 3.75035C6.70292 4.00035 5.23517 4.47035 3.86442 5.11035C3.85167 5.11035 3.83892 5.12035 3.83042 5.13535C1.2665 8.80035 0.626504 12.3604 0.932504 15.8804C0.932504 15.9104 0.95025 15.9404 0.97525 15.9554C2.71942 17.2354 4.40692 18.0104 6.06692 18.5104C6.09192 18.5204 6.11692 18.5104 6.13167 18.4904C6.55042 17.9104 6.92467 17.3004 7.24642 16.6604C7.26742 16.6204 7.24842 16.5704 7.20767 16.5554C6.60892 16.3254 6.03967 16.0504 5.48867 15.7404C5.44367 15.7154 5.44017 15.6504 5.48142 15.6204C5.58867 15.5404 5.69592 15.4554 5.79892 15.3704C5.81792 15.3554 5.84392 15.3504 5.86467 15.3604C9.31117 16.9104 13.0447 16.9104 16.4485 15.3604C16.4692 15.3504 16.4952 15.3554 16.5152 15.3704C16.6182 15.4554 16.7255 15.5404 16.8327 15.6204C16.874 15.6504 16.8715 15.7154 16.8255 15.7404C16.2745 16.0554 15.7052 16.3254 15.1065 16.5544C15.0657 16.5694 15.0477 16.6204 15.0677 16.6604C15.3947 17.2994 15.769 17.9094 16.1825 18.4894C16.1962 18.5104 16.2222 18.5204 16.2472 18.5104C17.9137 18.0104 19.6012 17.2354 21.3453 15.9554C21.3703 15.9404 21.388 15.9104 21.388 15.8804C21.7563 11.7954 20.742 8.25535 18.7885 5.13535C18.7811 5.12035 18.7683 5.11035 18.7213 5.11035ZM7.69942 13.6204C6.69492 13.6204 5.86142 12.7104 5.86142 11.6004C5.86142 10.4904 6.67942 9.58035 7.69942 9.58035C8.72692 9.58035 9.55392 10.5004 9.54017 11.6004C9.54017 12.7104 8.71942 13.6204 7.69942 13.6204ZM15.0242 13.6204C14.0187 13.6204 13.1862 12.7104 13.1862 11.6004C13.1862 10.4904 14.0042 9.58035 15.0242 9.58035C16.0517 9.58035 16.8787 10.5004 16.865 11.6004C16.865 12.7104 16.0527 13.6204 15.0242 13.6204Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LightXStudio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Designed with ❤️ for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;