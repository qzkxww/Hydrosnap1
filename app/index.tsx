import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Droplets } from 'lucide-react-native';

export default function IndexScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, go to main app
        router.replace('/(tabs)');
      } else {
        // User is not authenticated, go to onboarding
        router.replace('/onboarding');
      }
    }
  }, [user, loading]);

  // Show loading screen while checking auth state
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0EA5E9', '#0284C7']}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Droplets size={64} color="#ffffff" strokeWidth={2} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});