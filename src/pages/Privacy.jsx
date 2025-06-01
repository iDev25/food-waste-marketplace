import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-primary max-w-none">
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to GrubLinX ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and while using our services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website GrubLinX.com and use our platform to connect with surplus food opportunities.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>We collect information in the following ways:</p>
          <h3>2.1 Information You Provide to Us</h3>
          <ul>
            <li><strong>Account Information:</strong> When you register for an account, we collect your name, email address, password, and whether you're registering as an individual or business.</li>
            <li><strong>Profile Information:</strong> Information you add to your profile such as a profile picture, phone number, and preferences.</li>
            <li><strong>Business Information:</strong> If you register as a business, we collect business name, address, contact information, and verification details.</li>
            <li><strong>Listing Information:</strong> Details about food items you list, including descriptions, images, pickup location, availability times, and pricing.</li>
            <li><strong>Communications:</strong> Messages you exchange with other users through our platform.</li>
            <li><strong>Transaction Information:</strong> Information about transactions you complete through our service, including payment information when applicable.</li>
          </ul>
          
          <h3>2.2 Information We Collect Automatically</h3>
          <ul>
            <li><strong>Usage Information:</strong> How you use our service, including pages visited, time spent, and actions taken.</li>
            <li><strong>Device Information:</strong> Information about your device, including IP address, browser type, operating system, and device identifiers.</li>
            <li><strong>Location Information:</strong> With your permission, we collect precise location data to show you nearby listings and facilitate local connections.</li>
            <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to collect information about your browsing activities and to remember your preferences.</li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Connect users with surplus food opportunities</li>
            <li>Verify business accounts and prevent fraud</li>
            <li>Send notifications, updates, and support messages</li>
            <li>Personalize your experience and provide content recommendations</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Comply with legal obligations</li>
          </ul>
          
          <h2>4. Sharing Your Information</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>With Other Users:</strong> When you create a listing or interact with other users, certain information is shared to facilitate connections.</li>
            <li><strong>Service Providers:</strong> We share information with third-party vendors who provide services on our behalf.</li>
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or if we believe it's necessary to protect our rights, property, or safety.</li>
          </ul>
          
          <h2>5. Your Choices and Rights</h2>
          <p>You have several rights regarding your personal information:</p>
          <ul>
            <li><strong>Access and Update:</strong> You can access and update your account information through your profile settings.</li>
            <li><strong>Location Data:</strong> You can enable or disable location services through your device settings.</li>
            <li><strong>Marketing Communications:</strong> You can opt out of marketing emails by following the unsubscribe instructions.</li>
            <li><strong>Cookies:</strong> You can manage cookie preferences through your browser settings.</li>
            <li><strong>Data Rights:</strong> Depending on your location, you may have rights to request access, correction, deletion, or restriction of your personal information.</li>
          </ul>
          
          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
          
          <h2>7. Children's Privacy</h2>
          <p>
            Our services are not directed to children under 16. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child under 16, please contact us.
          </p>
          
          <h2>8. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than the one in which you reside. These countries may have different data protection laws. When we transfer your information, we take steps to ensure that your information receives an adequate level of protection.
          </p>
          
          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
          
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p>
            Email: privacy@grublinx.com<br />
            Address: 123 Food Rescue Way, Sustainability City, CA 94105
          </p>
        </div>
      </div>
    </div>
  )
}

export default Privacy
