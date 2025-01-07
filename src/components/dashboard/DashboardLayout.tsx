import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { DashboardWidget } from './widgets/DashboardWidget';
import { useDashboardWidgets } from './hooks/useDashboardWidgets';
import { useDashboardLayouts } from './hooks/useDashboardLayouts';
import { DashboardHeader } from './DashboardHeader';
import { BREAKPOINTS, COLS } from './config/layoutConfig';

const ResponsiveGridLayout = WidthProvider(Responsive);

export function DashboardLayout() {
  const [isEditing, setIsEditing] = useState(false);
  const { layouts, setLayouts, resetLayout } = useDashboardLayouts();
  const { widgets } = useDashboardWidgets();

  const handleLayoutChange = (_: any, allLayouts: any) => {
    if (isEditing) {
      setLayouts(allLayouts);
    }
  };

  return (
    <div className="p-4 lg:p-6 bg-gray-50 dark:bg-[#171717] min-h-full">
      <DashboardHeader 
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        onReset={resetLayout}
      />

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={BREAKPOINTS}
        cols={COLS}
        rowHeight={100}
        isDraggable={isEditing}
        isResizable={isEditing}
        onLayoutChange={handleLayoutChange}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        compactType="vertical"
        preventCollision={false}
        useCSSTransforms={true}
        resizeHandles={['se']}
        draggableHandle=".dashboard-widget-header"
      >
        {Object.entries(widgets).map(([key, widget]) => (
          <div key={key} className="dashboard-widget">
            <DashboardWidget isEditing={isEditing}>
              {widget}
            </DashboardWidget>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}