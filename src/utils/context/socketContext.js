import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { VendorContext } from "../context/vendorContext"

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { userToken, userDetails, userLocation } = useContext(VendorContext);

  useEffect(() => {
    if (userToken && userDetails) {
      // Replace with your server URL
      const newSocket = io('https://www.api.estreewalla.com', {
        auth: {
          token: userToken,
        },
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        console.log('✅ Socket connected');
        setIsConnected(true);
        
        // Join appropriate room based on user role
        const userId = userDetails.id || userDetails._id;
        const userRole = userDetails.role || 'customer'; // Default to customer if role not specified
        
        const room = userRole === 'customer' ? `customer_${userId}` : `vendor_${userId}`;
        
        console.log(`🎯 Joining room: ${room}`);
        newSocket.emit('join-room', room);
        
        // Also join location-based room if available
        if (userLocation?.city) {
          const locationRoom = `location_${userLocation.city.replace(/\s+/g, '_').toLowerCase()}`;
          newSocket.emit('join-room', locationRoom);
          console.log(`📍 Joining location room: ${locationRoom}`);
        }
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('error', (error) => {
        console.log('❌ Socket error:', error);
      });

      setSocket(newSocket);

      return () => {
        console.log('🔄 Cleaning up socket connection');
        newSocket.disconnect();
      };
    } else {
      // No user token, disconnect if socket exists
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [userToken, userDetails?.id, userDetails?.role]);

  const value = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};