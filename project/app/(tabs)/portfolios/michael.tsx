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
import {
  Github,
  Linkedin,
  Code,
  Brain,
  Wrench,
  Trophy,
  Users,
  BookOpen,
  ChevronRight,
  MapPin,
  GraduationCap,
  Heart,
} from 'lucide-react-native';
import { PortfolioNav } from '@/components/PortfolioNav';
import { colors, spacing, typography, radius } from '@/lib/theme';

const HERO_IMG =
  'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const CODING_IMG =
  'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ML_IMG =
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ROBOTICS_IMG =
  'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const SOCCER_IMG =
  'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const LEARNING_TOPICS = [
  {
    icon: Code,
    title: 'HTML & CSS',
    desc: 'Learned the basics of building and styling webpages so they look nice and work well.',
    image: CODING_IMG,
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    desc: 'Learned the basic ideas of how computers find patterns in data.',
    image: ML_IMG,
  },
];

const ACTIVITIES = [
  {
    icon: Heart,
    title: 'Volunteer at Upchieve',
    desc: 'Volunteering with a non-profit organization helping students with their academic needs.',
  },
  {
    icon: Wrench,
    title: 'Robotics Club',
    desc: 'Joined the school robotics club to build engineering and teamwork skills.',
  },
  {
    icon: Trophy,
    title: 'Soccer & Baseball',
    desc: 'Joined soccer and baseball teams to stay active and be part of a team.',
  },
  {
    icon: Users,
    title: 'Clubs & Spelling Bees',
    desc: 'Improved from being shy by joining clubs, spelling bees, and participating more.',
  },
];

export default function MichaelPortfolio() {
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
            <Text style={styles.heroName}>Michael Onu</Text>
            <Text style={styles.heroRole}>
              Future Engineer & Tech Creator
            </Text>
            <View style={styles.heroMeta}>
              <View style={styles.heroMetaItem}>
                <MapPin size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                <Text style={styles.heroMetaText}>New Jersey, USA</Text>
              </View>
              <View style={styles.heroMetaItem}>
                <GraduationCap size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                <Text style={styles.heroMetaText}>Class of 2027</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social buttons */}
        <View style={styles.ctaRow}>
          <Pressable
            style={({ pressed }) => [styles.btnDark, pressed && styles.pressed]}
            onPress={() => Linking.openURL('https://github.com/debunke')}>
            <Github size={16} color={colors.neutral[0]} strokeWidth={2} />
            <Text style={styles.btnDarkText}>GitHub</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.btnOutline, pressed && styles.pressed]}
            onPress={() => Linking.openURL('https://www.linkedin.com/')}>
            <Linkedin size={16} color={colors.neutral[900]} strokeWidth={2} />
            <Text style={styles.btnOutlineText}>LinkedIn</Text>
          </Pressable>
        </View>

        {/* About */}
        <View style={styles.aboutCard}>
          <Text style={styles.sectionLabel}>About Me</Text>
          <Text style={styles.bio}>
            Hello, my name is Michael Onu. I am originally from Nigeria and currently live in New Jersey. I am turning a senior in the Class of 2027. I have a passion for technology and learning how to create things. I am seeking internships, jobs, or programs that will help me develop my skills and gain real-world experience.
          </Text>
          <Text style={styles.bio}>
            Outside of school, I enjoy playing games, watching fiction movies and shows, reading, and staying active through soccer and any sports I find interesting.
          </Text>
        </View>

        {/* Key Learning Topics */}
        <Text style={styles.sectionTitle}>Key Learning Topics</Text>
        <Text style={styles.sectionIntro}>
          Topics that stood out to me and helped me understand how design and technology work.
        </Text>
        <View style={styles.topics}>
          {LEARNING_TOPICS.map(({ icon: Icon, title, desc, image }) => (
            <View key={title} style={styles.topicCard}>
              <Image source={{ uri: image }} style={styles.topicImage} />
              <View style={styles.topicInfo}>
                <View style={styles.topicHeader}>
                  <Icon size={18} color={colors.primary[600]} strokeWidth={2} />
                  <Text style={styles.topicTitle}>{title}</Text>
                </View>
                <Text style={styles.topicDesc}>{desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Future Goals */}
        <Text style={styles.sectionTitle}>Future Goals</Text>
        <View style={styles.goalsCard}>
          <View style={styles.goalIconWrap}>
            <BookOpen size={24} color={colors.primary[600]} strokeWidth={2} />
          </View>
          <Text style={styles.goalsText}>
            This course showed me how technology can solve real problems. The career path that interests me most is engineering. I want to keep learning so I can build useful things that help people.
          </Text>
        </View>

        {/* Activities */}
        <Text style={styles.sectionTitle}>Activities & Growth</Text>
        <View style={styles.activities}>
          {ACTIVITIES.map(({ icon: Icon, title, desc }) => (
            <View key={title} style={styles.activityRow}>
              <View style={styles.activityIconWrap}>
                <Icon size={20} color={colors.primary[600]} strokeWidth={2} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{title}</Text>
                <Text style={styles.activityDesc}>{desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <Text style={styles.sectionTitle}>Projects</Text>
        <View style={styles.projects}>
          <View style={styles.projectCard}>
            <Image source={{ uri: ROBOTICS_IMG }} style={styles.projectImage} />
            <View style={styles.projectTagWrap}>
              <View style={styles.projectTag}>
                <Text style={styles.projectTagText}>Robotics</Text>
              </View>
            </View>
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>Robotics Club Build</Text>
              <Text style={styles.projectDesc}>
                A robotics project built with the school club, applying engineering and programming skills in a team setting.
              </Text>
              <View style={styles.projectFooter}>
                <ChevronRight size={16} color={colors.primary[500]} strokeWidth={2.5} />
                <Text style={styles.projectLink}>View Details</Text>
              </View>
            </View>
          </View>
          <View style={styles.projectCard}>
            <Image source={{ uri: SOCCER_IMG }} style={styles.projectImage} />
            <View style={styles.projectTagWrap}>
              <View style={styles.projectTag}>
                <Text style={styles.projectTagText}>Sports</Text>
              </View>
            </View>
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>Soccer & Baseball Teams</Text>
              <Text style={styles.projectDesc}>
                Staying active and building teamwork skills through school soccer and baseball.
              </Text>
              <View style={styles.projectFooter}>
                <ChevronRight size={16} color={colors.primary[500]} strokeWidth={2.5} />
                <Text style={styles.projectLink}>View Details</Text>
              </View>
            </View>
          </View>
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
              onPress={() => Linking.openURL('https://github.com/debunke')}>
              <Github size={16} color={colors.neutral[900]} strokeWidth={2} />
              <Text style={styles.btnOutlineText}>GitHub</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.btnDark, pressed && styles.pressed]}
              onPress={() => Linking.openURL('https://www.linkedin.com/')}>
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
  maxWidth: 880,
    alignSelf: 'center',
    width: '100%',
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
  btnDarkText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.caption,
    color: colors.neutral[0],
  },
  btnOutlineText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.caption,
    color: colors.neutral[900],
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
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  sectionIntro: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.caption,
    color: colors.neutral[500],
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    lineHeight: 20,
  },

  // Topics
  topics: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  topicCard: {
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
  topicImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  topicInfo: {
    padding: spacing.md,
    gap: 6,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topicTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: typography.body,
    color: colors.neutral[900],
  },
  topicDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.caption,
    color: colors.neutral[500],
    lineHeight: 20,
  },

  // Goals
  goalsCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.primary[50],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary[200],
    padding: spacing.lg,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  goalIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  goalsText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: typography.body,
    color: colors.neutral[700],
    lineHeight: 24,
  },

  // Activities
  activities: {
    gap: 10,
    paddingHorizontal: spacing.lg,
  },
  activityRow: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: colors.neutral[0],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activityInfo: {
    flex: 1,
    gap: 3,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.body,
    color: colors.neutral[900],
  },
  activityDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.caption,
    color: colors.neutral[500],
    lineHeight: 20,
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
