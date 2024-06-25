import React from 'react';
import { useParams } from 'react-router-dom';

function YogaModule() {
  const { module_id } = useParams();
  console.log(`YogaModule rendered with module_id: ${module_id}`);

  return (
    <div>
      <h1>Yoga Module {module_id}</h1>
      <p>This is the content for Yoga Module {module_id}.</p>
    </div>
  );
}

export default YogaModule;
