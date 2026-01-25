import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Θα φαίνεται σωστά σε κινητά;',
    answer: 'Ναι. Mobile-first layout, μεγάλα tap targets, responsive εικόνες και performance-friendly animations.',
  },
  {
    question: 'Είναι chatbot;',
    answer: 'Όχι. Η AI χρησιμοποιείται για δομημένη καταγραφή συμβάντων και βελτιστοποίηση της διαδικασίας απόκρισης — όχι για «συζήτηση».',
  },
  {
    question: 'Μπορεί να δείχνει αληθινό status κλήσεων/SMS;',
    answer: 'Ναι. Μέσω callbacks του provider (π.χ. Vonage) εμφανίζεται στο dashboard: sent / delivered / answered / no-answer.',
  },
  {
    question: 'White-label;',
    answer: 'Ναι. Branding, domain/subdomain, UI, ρόλοι, flows και modules προσαρμόζονται ανά εταιρεία.',
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      id="faq" 
      className="py-24 relative"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <h2 
            id="faq-heading"
            className={`text-3xl md:text-4xl font-bold mb-4 reveal ${isVisible ? 'visible' : ''}`}
          >
            <span className="text-gradient">Συχνές ερωτήσεις</span>
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Συχνές ερωτήσεις — σύντομες απαντήσεις.
          </p>
        </div>

        <div className={`max-w-3xl mx-auto reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-card border border-border/50 rounded-xl px-6 data-[state=open]:border-neon-purple/40 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-neon-purple transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
