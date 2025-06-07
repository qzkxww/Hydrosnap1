import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Droplets, 
  Plus, 
  Target,
  Zap,
  Smile
} from 'lucide-react-native';

export default function HomeTab() {
  const [waterIntake, setWaterIntake] = useState(1200);
  const [dailyGoal] = useState(2500);
  const [currentMood, setCurrentMood] = useState<'low' | 'medium' | 'high'>('medium');
  const [energyLevel, setEnergyLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // Animation values
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const progress = Math.min(waterIntake / dailyGoal, 1);
  const remainingWater = Math.max(dailyGoal - waterIntake, 0);

  // Initialize progress animation
  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const addWater = (amount: number) => {
    const newIntake = Math.min(waterIntake + amount, dailyGoal);
    setWaterIntake(newIntake);

    // Animate the progress bar
    const newProgress = Math.min(newIntake / dailyGoal, 1);
    
    // Scale animation for feedback
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Progress bar animation
    Animated.timing(progressAnimation, {
      toValue: newProgress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const moodColor = {
    low: '#ef4444',
    medium: '#f59e0b',
    high: '#10b981'
  };

  const energyColor = {
    low: '#6b7280',
    medium: '#3b82f6',
    high: '#8b5cf6'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header with Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Droplets size={24} color="#0EA5E9" strokeWidth={2} />
            <Text style={styles.logoText}>HydroSnap</Text>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.subtitle}>Let's stay hydrated today</Text>
          </View>
        </View>

        {/* Main Progress Card */}
        <View style={styles.progressCard}>
          <Animated.View 
            style={[
              styles.progressRingContainer,
              {
                transform: [{ scale: scaleAnimation }]
              }
            ]}
          >
            {/* Circular Progress Ring */}
            <View style={styles.progressRing}>
              <LinearGradient
                colors={['#0EA5E9', '#0284C7']}
                style={styles.progressRingGradient}
              >
                <View style={styles.progressRingInner}>
                  {/* Water Icon and Text - Always Straight */}
                  <View style={styles.progressCenter}>
                    <Droplets size={32} color="#0EA5E9" strokeWidth={2} />
                    <Text style={styles.progressText}>{waterIntake}ml</Text>
                    <Text style={styles.progressGoal}>of {dailyGoal}ml</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Animated.View>
          
          <View style={styles.progressStats}>
            <Text style={styles.remainingText}>
              {remainingWater > 0 
                ? `${remainingWater}ml to go` 
                : 'Goal achieved!'
              }
            </Text>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill, 
                  { 
                    width: progressAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    })
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => addWater(250)}
          >
            <View style={styles.actionIcon}>
              <Plus size={20} color="#0EA5E9" strokeWidth={2} />
            </View>
            <Text style={styles.actionText}>250ml</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => addWater(500)}
          >
            <View style={styles.actionIcon}>
              <Plus size={20} color="#0EA5E9" strokeWidth={2} />
            </View>
            <Text style={styles.actionText}>500ml</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => addWater(750)}
          >
            <View style={styles.actionIcon}>
              <Plus size={20} color="#0EA5E9" strokeWidth={2} />
            </View>
            <Text style={styles.actionText}>750ml</Text>
          </TouchableOpacity>
        </View>

        {/* Mood & Energy Tracker */}
        <View style={styles.trackerCard}>
          <Text style={styles.cardTitle}>How are you feeling?</Text>
          
          <View style={styles.trackerRow}>
            <View style={styles.trackerItem}>
              <Smile size={20} color={moodColor[currentMood]} strokeWidth={2} />
              <Text style={styles.trackerLabel}>Mood</Text>
              <View style={styles.trackerButtons}>
                {['low', 'medium', 'high'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.trackerButton,
                      currentMood === level && { backgroundColor: moodColor[level as keyof typeof moodColor] }
                    ]}
                    onPress={() => setCurrentMood(level as 'low' | 'medium' | 'high')}
                  >
                    <View style={[
                      styles.trackerDot,
                      { backgroundColor: currentMood === level ? '#fff' : moodColor[level as keyof typeof moodColor] }
                    ]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.trackerItem}>
              <Zap size={20} color={energyColor[energyLevel]} strokeWidth={2} />
              <Text style={styles.trackerLabel}>Energy</Text>
              <View style={styles.trackerButtons}>
                {['low', 'medium', 'high'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.trackerButton,
                      energyLevel === level && { backgroundColor: energyColor[level as keyof typeof energyColor] }
                    ]}
                    onPress={() => setEnergyLevel(level as 'low' | 'medium' | 'high')}
                  >
                    <View style={[
                      styles.trackerDot,
                      { backgroundColor: energyLevel === level ? '#fff' : energyColor[level as keyof typeof energyColor] }
                    ]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Daily Tips */}
        <View style={styles.tipsCard}>
          <Target size={20} color="#8b5cf6" strokeWidth={2} />
          <Text style={styles.tipsTitle}>Today's Tip</Text>
          <Text style={styles.tipsText}>
            Drink a glass of water as soon as you wake up to kickstart your metabolism and rehydrate after sleep.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#0EA5E9',
    marginLeft: 8,
  },
  headerContent: {
    // Header content styles
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  progressRingContainer: {
    marginBottom: 24,
  },
  progressRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    padding: 8,
  },
  progressRingGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 76,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRingInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCenter: {
    alignItems: 'center',
    // Remove any transform or rotation styles
  },
  progressText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginTop: 8,
  },
  progressGoal: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  progressStats: {
    alignItems: 'center',
    width: '100%',
  },
  remainingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#0EA5E9',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  trackerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 20,
  },
  trackerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trackerItem: {
    alignItems: 'center',
    flex: 1,
  },
  trackerLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginTop: 8,
    marginBottom: 12,
  },
  trackerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  trackerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  trackerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  tipsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginLeft: 12,
    marginBottom: 8,
    flex: 1,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 20,
    marginLeft: 32,
    marginTop: -24,
  },
});