import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import RippleChat from '@/components/RippleChat';

export default function ChatTab() {
  return (
    <SafeAreaView style={styles.container}>
      <RippleChat
        waterIntake={1200}
        dailyGoal={2500}
        currentMood="medium"
        energyLevel="medium"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});