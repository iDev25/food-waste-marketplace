import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to home
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <div className="prose prose-primary max-w-none">
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            Welcome to GrubLinX. These Terms of Service ("Terms") govern your access to and use of the GrubLinX website, mobile application, and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Service.
          </p>
          
          <h2>2. Definitions</h2>
          <p>Throughout these Terms:</p>
          <ul>
            <li><strong>"GrubLinX,"</strong> "we," "us," and "our" refer to GrubLinX, Inc.</li>
            <li><strong>"User,"</strong> "you," and "your" refer to any individual or entity using our Service.</li>
            <li><strong>"Content"</strong> refers to text, images, photos, audio, video, and all other forms of data or communication.</li>
            <li><strong>"Listing"</strong> refers to an offer of surplus food posted by a User on our Service.</li>
          </ul>
          
          <h2>3. Eligibility</h2>
          <p>
            You must be at least 16 years old to use our Service. By using our Service, you represent and warrant that you meet this requirement. If you are using the Service on behalf of a business or other entity, you represent and warrant that you have the authority to bind that entity to these Terms.
          </p>
          
          <h2>4. Accounts</h2>
          <p>
            To access certain features of our Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2>5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any applicable law or regulation</li>
            <li>Post false, misleading, or deceptive content</li>
            <li>Impersonate any person or entity</li>
            <li>Harass, abuse, or harm another person</li>
            <li>Use our Service for any illegal or unauthorized purpose</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Use automated means to access or collect data from our Service</li>
            <li>Post content that infringes intellectual property rights</li>
            <li>Post content that is offensive, harmful, or violates the rights of others</li>
          </ul>
          
          <h2>6. Food Listings and Transactions</h2>
          <p>
            GrubLinX is a platform that connects users with surplus food opportunities. We do not own, sell, or distribute any food items. Users who post listings are solely responsible for:
          </p>
          <ul>
            <li>The accuracy and completeness of their listings</li>
            <li>Ensuring food safety and compliance with applicable food handling regulations</li>
            <li>Disclosing allergen information and potential risks</li>
            <li>Fulfilling the terms of any transaction as described in their listing</li>
          </ul>
          <p>
            Users who acquire food through our Service acknowledge that:
          </p>
          <ul>
            <li>GrubLinX does not guarantee the quality, safety, or legality of listed items</li>
            <li>They assume all risks associated with acquiring and consuming food items</li>
            <li>They are responsible for verifying the condition of items before consumption</li>
          </ul>
          
          <h2>7. Business Verification</h2>
          <p>
            Business users may be subject to verification procedures to confirm their identity and legitimacy. By registering as a business, you agree to provide accurate information and cooperate with our verification process. We reserve the right to reject or revoke business status if we determine, in our sole discretion, that a business does not meet our eligibility criteria or has violated these Terms.
          </p>
          
          <h2>8. Content and Intellectual Property</h2>
          <p>
            By posting content on our Service, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, modify, display, and distribute that content in connection with the operation and promotion of our Service. You represent and warrant that you own or have the necessary rights to the content you post and that your content does not violate the rights of any third party.
          </p>
          <p>
            All intellectual property rights in the Service, including trademarks, logos, and software, are owned by GrubLinX or its licensors. Nothing in these Terms grants you a right or license to use any trademark, design right, or copyright owned or controlled by GrubLinX or any third party except as expressly provided in these Terms.
          </p>
          
          <h2>9. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. GRUBLINX DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICE OR THE SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
          <p>
            GRUBLINX IS NOT RESPONSIBLE FOR THE QUALITY, SAFETY, OR LEGALITY OF FOOD ITEMS OFFERED BY USERS, THE TRUTH OR ACCURACY OF LISTINGS, THE ABILITY OF USERS TO PROVIDE FOOD ITEMS, OR THE ABILITY OF USERS TO PAY FOR FOOD ITEMS.
          </p>
          
          <h2>10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, GRUBLINX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (C) ANY CONTENT OBTAINED FROM THE SERVICE; OR (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
          </p>
          <p>
            IN NO EVENT SHALL GRUBLINX'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICE EXCEED ONE HUNDRED U.S. DOLLARS ($100) OR THE AMOUNT YOU PAID TO GRUBLINX, IF ANY, IN THE PAST TWELVE MONTHS.
          </p>
          
          <h2>11. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless GrubLinX, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any rights of another.
          </p>
          
          <h2>12. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
          
          <h2>13. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. If we make material changes to these Terms, we will notify you by email or by posting a notice on our website prior to the changes becoming effective. Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of the changes.
          </p>
          
          <h2>14. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the State of California, without respect to its conflict of laws principles. Any dispute arising from or relating to the subject matter of these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in San Francisco County, California.
          </p>
          
          <h2>15. Entire Agreement</h2>
          <p>
            These Terms constitute the entire agreement between you and GrubLinX regarding our Service and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning the Service.
          </p>
          
          <h2>16. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: legal@grublinx.com<br />
            Address: 123 Food Rescue Way, Sustainability City, CA 94105
          </p>
        </div>
      </div>
    </div>
  )
}

export default Terms
