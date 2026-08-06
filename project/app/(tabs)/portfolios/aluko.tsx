import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import { Github, Linkedin, Shield, Network, Smartphone, ChevronRight, MapPin, GraduationCap } from 'lucide-react-native';
import { PortfolioNav } from '@/components/PortfolioNav';
import { colors, spacing, typography, radius } from '@/lib/theme';

const NETWORK_IMG =
  'https://images.pexels.com/photos/2881233/pexels-photo-2881233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const POWER_APP_IMG =
  'https://images.pexels.com/photos/969462/pexels-photo-969462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const CYBER_IMG =
  'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const HERO_IMG =
  'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const SKILLS = [
  { label: 'Cybersecurity', icon: Shield },
  { label: 'Networking', icon: Network },
  { label: 'Mobile Dev', icon: Smartphone },
];

const PROJECTS = [
  {
    image: NETWORK_IMG,
    name: 'Auto Network Configuration',
    desc: 'A tool that automates network device setup and configuration, applying security policies and routing rules without manual intervention.',
    tag: 'Networking',
  },
  {
    image: POWER_APP_IMG,
    name: 'Microsoft Power Mobile App',
    desc: 'A mobile application integrating Microsoft Power services, enabling users to monitor and manage workflows from their phone.',
    tag: 'Mobile',
  },
  {
    image: CYBER_IMG,
    name: 'Security Policy Analyzer',
    desc: 'A tool that scans system configurations and network rules to surface vulnerabilities and generate compliance-ready reports.',
    tag: 'Cybersecurity',
  },
];

export default function AlukoPortfolio() {
  return (
    <SafeAreaView style={styles.container}>
      <PortfolioNav />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.heroCard}>
          <Image source={{ uri: HERO_IMG }} style={styles.heroBg} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Available for Opportunities</Text>
            </View>
            <Text style={styles.heroName}>Aluko Kouame</Text>
            <Text style={styles.heroRole}>
              Cybersecurity & Networking Enthusiast
            </Text>
            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <MapPin size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                <Text style={styles.heroMetaText}>Maryland, USA</Text>
              </View>
              <View style={styles.heroMetaItem}>
                <GraduationCap size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                <Text style={styles.heroMetaText}>Class of 2028</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social buttons */}
        <View style={styles.ctaRow}>
          <Pressable
            style={({ pressed }) => [styles.btnDark, pressed && styles.pressed]}
            onPress={() => Linking.openURL('https://github.com/Aykouam')}>
            <Github size={16} color={colors.neutral[0]} strokeWidth={2} />
            <Text style={styles.btnDarkText}>GitHub</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.btnLinkedin, pressed && styles.pressed]}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/aykouam/')}>
            <Linkedin size={16} color={colors.neutral[0]} strokeWidth={2} />
            <Text style={styles.btnDarkText}>LinkedIn</Text>
          </Pressable>
        </View>

        {/* About */}
        <View style={styles.aboutCard}>
          <Text style={styles.sectionLabel}>About Me</Text>
          <Text style={styles.bio}>
            I'm a rising junior in high school in Maryland (Class of 2028) with a deep passion for cybersecurity and computer networking. I'm actively seeking internships, jobs, or programs to develop my skills and gain real-world experience.
          </Text>
          <Text style={styles.bio}>
            Outside of tech, I enjoy playing sports, video games, and watching anime.
          </Text>
        </View>

        {/* Skills */}
        <Text style={styles.sectionTitle}>Areas of Focus</Text>
        <View style={styles.skillRow}>
          {SKILLS.map(({ label, icon: Icon }) => (
            <View key={label} style={styles.skillChip}>
              <Icon size={20} color={colors.primary[600]} strokeWidth={2} />
              <Text style={styles.skillLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Projects */}
        <Text style={styles.sectionTitle}>Projects</Text>
        <View style={styles.projects}>
          {PROJECTS.map((proj) => (
            <View key={proj.name} style={styles.projectCard}>
              <Image source={{ uri: proj.image }} style={styles.projectImage} />
              <View style={styles.projectTagWrap}>
                <View style={styles.projectTag}>
                  <Text style={styles.projectTagText}>{proj.tag}</Text>
                </View>
              </View>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{proj.name}</Text>
                <Text style={styles.projectDesc}>{proj.desc}</Text>
                <View style={styles.projectFooter}>
                  <ChevronRight size={16} color={colors.primary[500]} strokeWidth={2.5} />
                  <Text style={styles.projectLink}>View Details</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* CTA Footer */}
        <View style={styles.footerCta}>
          <Text style={styles.footerCtaTitle}>Let's Connect</Text>
          <Text style={styles.footerCtaDesc}>
            Open to internships, mentorship, and tech programs. Reach out on LinkedIn or explore my work on GitHub.
          </Text>
          <View style={styles.ctaRow}>
            <Pressable
              style={({ pressed }) => [styles.btnOutline, pressed && styles.pressed]}
              onPress={() => Linking.openURL('https://github.com/Aykouam')}>
              <Github size={16} color={colors.neutral[900]} strokeWidth={2} />
              <Text style={styles.btnOutlineText}>GitHub</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.btnLinkedin, pressed && styles.pressed]}
              onPress={() => Linking.openURL('https://www.linkedin.com/in/aykouam/')}>
              <Linkedin size={16} color={colors.neutral[0]} strokeWidth={2} />
              <Text style={styles.btnDarkText}>LinkedIn</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  content: {
    paddingBottom: spacing.xxl + 16,
  },

  // Hero
  heroCard: {
    height: 280,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 30, 50, 0.68)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: 10,
  },
  heroBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: colors.neutral[0],
    letterSpacing: 0.5,
  },
  heroName: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: colors.neutral[0],
    marginBottom: 4,
  },
  heroRole: {
    fontFamily: 'Inter-Medium',
    fontSize: typography.body,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 12,
  },
  heroMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  heroMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  heroMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.caption,
    color: 'rgba(255,255,255,0.75)',
  },

  // Buttons
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  btnDark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.neutral[900],
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: radius.md,
    flex: 1,
    justifyContent: 'center',
  },
  btnLinkedin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0A66C2',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: radius.md,
    flex: 1,
    justifyContent: 'center',
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.neutral[0],
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: radius.md,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  btnOutlineText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.caption,
    color: colors.neutral[900],
  },
  btnDarkText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.caption,
    color: colors.neutral[0],
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },

  // About
  aboutCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    padding: spacing.lg,
    gap: 10,
  },
  sectionLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: typography.body,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.body,
    color: colors.neutral[600],
    lineHeight: 26,
  },

  // Section titles
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.caption,
    color: colors.neutral[400],
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },

  // Skills
  skillRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: spacing.lg,
  },
  skillChip: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.neutral[0],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  skillLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: colors.primary[700],
    textAlign: 'center',
  },

  // Projects
  projects: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  projectCard: {
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    overflow: 'hidden',
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  projectImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  projectTagWrap: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  projectTag: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  projectTagText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: colors.neutral[0],
    letterSpacing: 0.4,
  },
  projectInfo: {
    padding: spacing.md,
    gap: 6,
  },
  projectName: {
    fontFamily: 'Inter-Bold',
    fontSize: typography.body,
    color: colors.neutral[900],
  },
  projectDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.caption,
    color: colors.neutral[500],
    lineHeight: 20,
  },
  projectFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 4,
  },
  projectLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.caption,
    color: colors.primary[600],
  },

  // Footer CTA
  footerCta: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.neutral[900],
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  footerCtaTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: colors.neutral[0],
    marginBottom: 8,
  },
  footerCtaDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.body,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
});
