//need to make use client or change so it works

import PlantDetails from './PlantDetails'

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PlantInfoPage({ params }: PageProps) {
  const { slug } = await params;
  console.log({slug});

  return (
    <div>
      <h2>Dynamic Parameter: {slug}</h2>
      <PlantDetails slug= {slug} />
    </div>
  )
}