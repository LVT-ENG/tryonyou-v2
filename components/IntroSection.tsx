import { useEffect } from 'react';

const IntroSection: React.FC = () => {
  useEffect(() => {
    const getLocalizedVideo = (lang: string = 'en') => {
      const videoMap: Record<string, string> = {
        es: 'videos/intro_es.mp4',
        fr: 'videos/intro_fr.mp4',
        en: 'videos/intro_en.mp4',
        'pt-br': 'videos/intro_pt.mp4',
        pt: 'videos/intro_pt.mp4',
      };
      const matchedLang = Object.keys(videoMap).find(key => lang.startsWith(key));
      return videoMap[matchedLang || 'en'];
    };

    const lang = navigator.language || 'en';
    const videoEl = document.getElementById('intro-video') as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.src = getLocalizedVideo(lang);
    }

    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <section>
      <video id="intro-video" autoPlay muted playsInline />
      <footer>
        <small>&copy; <span id="copyright-year" /> TRYONYOU.APP</small>
      </footer>
    </section>
  );
};

export default IntroSection;
