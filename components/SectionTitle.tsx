import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface SectionTitleProps {
  title: string;
  color?: string;
}

export default function SectionTitle({ title, color = '#ea982b' }: SectionTitleProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Ionicons name="earth" size={20} style={[styles.titleIcon, { color }]} />
      <View style={styles.lineContainer}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        {/* <View style={[styles.line, { backgroundColor: color }]}></View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'TimesNewRomanBold',
    letterSpacing: 1,
    textAlign: 'center',
    textShadowColor: '#0000008',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  titleIcon: {
    color: '#ea982b',
  },
  lineContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '80%',
    height: 2,
    backgroundColor: '#ea982b',   
  },
});

