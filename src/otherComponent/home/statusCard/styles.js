import { StyleSheet } from 'react-native';
import { windowHeight } from '../../../theme/appConstant';

export const styles = StyleSheet.create({
  grid: {
    marginTop: windowHeight(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  card: {
    width: '48.5%',
    minHeight: 170,
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    backgroundColor: '#fff',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    opacity: 0.9,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 20,
  },
  countSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
