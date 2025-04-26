import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {ChevronRight, ChevronRightCircle} from 'lucide-react-native'

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps): JSX.Element {
  return (
    <View style={styles.container}>
      <ChevronRightCircle size={20} style={styles.titleIcon} />
      <View style={styles.lineContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line}></View>
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
    color: '#fff',
    backgroundColor: '#0000FF',
    borderRadius: 50,
    padding: 5,
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
    backgroundColor: '#0000FF',
  },
});

