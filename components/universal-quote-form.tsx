import React from 'react';
// Import the necessary components
import SimpleQuoteForm from './SimpleQuoteForm';
import EvansvilleQuoteForm from './EvansvilleQuoteForm';
import ContactSection from './ContactSection';
import BentoGrid from './BentoGrid';
import QuoteFormModal from './QuoteFormModal';
import QuoteFormStandalone from './QuoteFormStandalone';

interface UniversalQuoteFormProps {
  variant: 'simple' | 'detailed' | 'contact' | 'embedded';
  theme?: string;
  allowPhotoUpload?: boolean;
  locationCustomization?: boolean;
}

const UniversalQuoteForm: React.FC<UniversalQuoteFormProps> = ({
  variant,
  theme,
  allowPhotoUpload,
  locationCustomization,
}) => {
  switch (variant) {
    case 'simple':
      return <SimpleQuoteForm theme={theme} allowPhotoUpload={allowPhotoUpload} />;
    case 'detailed':
      return <EvansvilleQuoteForm theme={theme} allowPhotoUpload={allowPhotoUpload} />;
    case 'contact':
      return (
        <> 
          <ContactSection />
          <QuoteFormModal theme={theme} locationCustomization={locationCustomization} />
        </>
      );
    case 'embedded':
      return <QuoteFormStandalone theme={theme} />;
    default:
      return null;
  }
};

export default UniversalQuoteForm;
