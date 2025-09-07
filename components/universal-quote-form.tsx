import React, { useState } from 'react';
// Import the necessary components
import { SimpleQuoteForm } from './simple-quote-form';
import { EvansvilleQuoteForm } from './evansville-quote-form';
import ContactSection from './contact-section';
import { QuoteFormModal } from './quote-form-modal';
import { QuoteFormStandalone } from './quote-form-standalone';

interface UniversalQuoteFormProps {
  variant: 'simple' | 'detailed' | 'contact' | 'embedded';
  theme?: string;
  allowPhotoUpload?: boolean;
  locationCustomization?: boolean;
}

const UniversalQuoteForm: React.FC<UniversalQuoteFormProps> = ({
  variant,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  switch (variant) {
    case 'simple':
      return <SimpleQuoteForm />;
    case 'detailed':
      return <EvansvilleQuoteForm />;
    case 'contact':
      return (
        <> 
          <ContactSection />
          <QuoteFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
      );
    case 'embedded':
      return <QuoteFormStandalone />;
    default:
      return null;
  }
};

export default UniversalQuoteForm;
