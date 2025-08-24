import { useEffect, useRef } from 'react';

const useTouchControls = (onMove) => {
  const startTouch = useRef({ x: 0, y: 0 });
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const container = gameContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      // 防止默认行为
      e.preventDefault();
      
      const touch = e.touches[0];
      startTouch.current = {
        x: touch.clientX,
        y: touch.clientY
      };
      
      // 添加视觉反馈
      container.style.transform = 'scale(0.98)';
      container.style.transition = 'transform 0.1s ease';
    };

    const handleTouchEnd = (e) => {
      // 恢复视觉状态
      container.style.transform = 'scale(1)';
      
      if (!e.changedTouches[0]) return;
      
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startTouch.current.x;
      const deltaY = touch.clientY - startTouch.current.y;
      
      // 增加最小滑动距离，防止意外触发
      const minSwipeDistance = 50;
      
      // 检查是否达到最小滑动距离
      if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        return;
      }
      
      // 确定主要滑动方向（增加偏向性，防止斜向滑动）
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      if (absX > absY * 1.5) {
        // 明显的水平滑动
        if (deltaX > 0) {
          onMove('ArrowRight');
        } else {
          onMove('ArrowLeft');
        }
      } else if (absY > absX * 1.5) {
        // 明显的垂直滑动
        if (deltaY > 0) {
          onMove('ArrowDown');
        } else {
          onMove('ArrowUp');
        }
      }
      // 如果方向不明显，则不执行任何操作
    };

    const handleTouchMove = (e) => {
      // 防止页面滚动和缩放
      e.preventDefault();
    };
    
    const handleTouchCancel = (e) => {
      // 触摸取消时恢复视觉状态
      container.style.transform = 'scale(1)';
    };

    // 使用 passive: false 以支持 preventDefault
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [onMove]);

  return gameContainerRef;
};

export default useTouchControls;