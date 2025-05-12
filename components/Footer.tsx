import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const NAV_LINKS = [
  [
    { label: 'Accueil', route: '/' },
    { label: 'Formations', route: '/formations' },
    { label: 'Albums', route: '/albums' },
    { label: 'Contact', route: '/contact' },
  ],
  [
    { label: 'Diplômes', route: '/diplomes' },
    { label: 'Santé', route: '/sante' },
    { label: 'Beauté', route: '/beaute' },
    { label: 'Sport', route: '/sport' },
  ],
  [
    { label: 'Modélisme', route: '/modelisme' },
    { label: 'EPS', route: '/eps' },
    { label: 'Métiers', route: '/metiers' },
    { label: 'Plus', route: '/plus' },
  ],
  [
    { label: 'Aide', route: '/aide' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Support', route: '/support' },
    { label: 'Mentions', route: '/mentions' },
  ],
];

const SOCIALS = [
  { name: 'facebook', url: 'https://www.facebook.com/EcoleJahInformatique' },
  { name: 'instagram', url: 'https://instagram.com/jahinformatiqueplus' },
  { name: 'youtube', url: 'https://www.youtube.com/@jahinformatique' },
];

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleRoutePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.footer}>
      {/* Social Icons */}
      <View style={styles.socialRow}>
        {SOCIALS.map((item) => (
          <Pressable key={item.name} style={styles.socialIcon} onPress={() => Linking.openURL(item.url)}>
            <FontAwesome name={item.name as any} size={18} color="#fff" />
          </Pressable>
        ))}
      </View>

     

      {/* Description */}
      <Text style={styles.description}>
      Cette application est conçue pour offrir une formation de qualité aux participants désireux d'améliorer leurs compétences professionnelles. Elle propose une variété de formations et de diplômes reconnus, en collaboration avec des partenaires de renom, pour répondre aux besoins du marché du travail.
      </Text>

      {/* Links Columns */}
      <View style={styles.linksRow}>
        {NAV_LINKS.map((col, idx) => (
          <View style={styles.linkCol} key={idx}>
            
            {col.map((link) => (
              <Pressable key={link.label} onPress={() => handleRoutePress(link.route)}>
                <Text style={styles.link}>{link.label}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Copyright */}
      <Text style={styles.copyright}>
        © {new Date().getFullYear()} Copyright: Jah Informatique Plus
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#000',
    paddingVertical: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    gap: 18,
  },
  socialIcon: {
    marginHorizontal: 8,
    width: 40,
    height: 40,
    backgroundColor: '#3a3232',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 10,
    lineHeight: 20,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  linkCol: {
    flex: 1,
    alignItems: 'center',
  },
  linkColTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 15,
  },
  link: {
    color: '#fff',
    marginBottom: 6,
    fontSize: 13,
  },
  copyright: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 10,
    opacity: 0.7,
  },
}); 