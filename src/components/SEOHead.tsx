import { Helmet } from 'react-helmet-async';
import { business } from '../data/business';

type SEOHeadProps = {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
};

export function SEOHead({ title, description, path, type = 'website', image }: SEOHeadProps) {
  const url = `${business.url}${path}`;
  const ogImage = image || `${business.url}/eh_public_assets/hero/hero_asset.webp`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
