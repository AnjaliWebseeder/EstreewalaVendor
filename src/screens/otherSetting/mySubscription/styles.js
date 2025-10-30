import { StyleSheet } from "react-native";
import appColors from "../../../theme/appColors";
import { windowHeight } from "../../../theme/appConstant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7', // soft neutral background
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  /* ─────────── Loading & Error ─────────── */
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F4F7',
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  errorContainer: {
    backgroundColor: '#FFF3F4',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#FFB4B4',
  },
  errorText: {
    color: '#B71C1C',
    fontSize: 13,
    marginVertical: 6,
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  /* ─────────── Empty State ─────────── */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 22,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  emptyIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#F4F6F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  /* ─────────── Subscription Card ─────────── */
  card: {
    backgroundColor: '#FFFFFFCC',
    borderRadius: 18,
    padding: windowHeight(30),
    marginBottom: 18,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    
  },
  firstCard: {
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0E1111',
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  /* ─────────── Services Section ─────────── */
  servicesSection: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 10,
    color: appColors.title,
    fontWeight: '600',
    marginLeft: 4,
  },

  /* ─────────── Timeline Section ─────────── */
  timeline: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineItem: {
    flex: 1,
    alignItems: 'center',
  },
  timelineLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
  },
  timelineValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  timelineDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#E0E0E0',
  },
  daysLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  warningText: {
    color: '#DC2626',
  },
});
