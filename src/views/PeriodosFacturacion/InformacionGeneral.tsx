import React, { useEffect, useState } from 'react';
import { createSwapy } from 'swapy'
import { PieChart, PieChartComponent } from '../../components/ui/PieChart';

export const InformacionGeneral = () => {

  useEffect(() => {
    const container = document.querySelector('.Swappycontainer');
    if (container) {
      const swapy = createSwapy(container, {
        animation: 'dynamic'
      })
    }
  }, [])




  return (
    <div>
      <PieChartComponent />
    </div>
  )
}


