import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

const SEOHelmet: React.FC<SEOProps> = ({
  title = 'הפותר - סוגרים לך פינה בעבודות עיצוב ותוכן דחופות',
  description = 'אנחנו מספקים פתרונות עיצוב, מחקר, תוכן ואנליזה מהירים ואיכותיים באמצעות טכנולוגיית AI מתקדמת. עם הפותר, תקבלו תוצאות מעולות במהירות שלא תאמינו.',
  keywords = 'עיצוב מצגות, עיצוב תמונות, עריכת וידאו, עיצוב מסמכים, עיצוב גרפי, תוכן, מחקר, אנליזה',
  canonicalUrl = 'https://hapoterisrael.com', // שנה לדומיין האמיתי שלך
  ogImage = 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ogType = 'website',
}) => {
  return (
    <Helmet>
      {/* תגיות בסיסיות */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* תגיות Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />

      {/* תגיות Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* תגיות ניידים */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* תגיות Schema.org עבור Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "הפותר",
          "description": description,
          "url": canonicalUrl,
          "logo": `${canonicalUrl}/assets/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+972542001020",
            "contactType": "customer service",
            "email": "hello@itayux.com"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;