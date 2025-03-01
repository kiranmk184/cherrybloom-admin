// src/components/DataGrid/ContextMenu.tsx
import React, { useRef, useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DataGridContextMenu: React.FC<ContextMenuProps> = ({ 
  x, 
  y, 
  onEdit, 
  onDelete 
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Adjust position if menu would go outside viewport
    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = x;
      let adjustedY = y;
      
      if (x + menuRect.width > viewportWidth) {
        adjustedX = viewportWidth - menuRect.width - 10;
      }
      
      if (y + menuRect.height > viewportHeight) {
        adjustedY = viewportHeight - menuRect.height - 10;
      }
      
      menuRef.current.style.left = `${adjustedX}px`;
      menuRef.current.style.top = `${adjustedY}px`;
    }
  }, [x, y]);
  
  return (
    <div 
      ref={menuRef}
      className="fixed z-50 min-w-[160px] bg-app-bg shadow-lg shadow-app-content-15 divide-y divide-app-content-25 border border-app-content-25 rounded-md"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-[.5rem] divide-y divide-app-content-25">
        {onEdit && (
          <button
            className="w-full text-left px-4 py-2 text-sm text-app-content-95 hover:bg-app-content-15 transition-colors duration-150"
            onClick={onEdit}
          >
            Edit
          </button>
        )}
        
        {onDelete && (
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-app-content-15 transition-colors duration-150"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default DataGridContextMenu;