import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomMaterialStudio } from './components/RoomMaterialStudio';
import { CostEstimator } from './components/CostEstimator';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { ReviewsSpotlight } from './components/ReviewsSpotlight';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');

  const openConsultation = (context = '') => {
    setModalContext(context);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F4F1EA]">
      <Navbar onOpenConsultation={() => openConsultation()} />

      <main>
        <HeroSection onOpenConsultation={() => openConsultation()} />

        <RoomMaterialStudio
          onSelectForConsultation={(summary) =>
            openConsultation(`Material Studio Request: ${summary}`)
          }
        />

        <CostEstimator
          onBookWithEstimate={(estimateSummary) =>
            openConsultation(`Cost Estimator Brief: ${estimateSummary}`)
          }
        />

        <BeforeAfterShowcase
          onOpenConsultation={() =>
            openConsultation('Turnkey Space Transformation Inquiry')
          }
        />

        <ReviewsSpotlight onOpenConsultation={() => openConsultation()} />
      </main>

      <Footer onOpenConsultation={() => openConsultation()} />

      <ConsultationModal
        isOpen={modalOpen}
        initialContext={modalContext}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
