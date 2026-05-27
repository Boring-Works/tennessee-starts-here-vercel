/**
 * Almanac Components - Barrel Export
 *
 * Central export point for all almanac UI components.
 * Import from '@/components/almanac' instead of individual files.
 */

// ============================================================================
// Core Display Components
// ============================================================================
export { AlmanacHero } from './AlmanacHero'
export { VisitorStatusCard } from './VisitorStatusCard'
export { default as CurrentConditionsCard } from './CurrentConditionsCard'
export { WeatherDetails } from './WeatherDetails'
export { default as HourlySparkline } from './HourlySparkline'
export { default as TomorrowPreview } from './TomorrowPreview'
export { WeatherAtmosphere } from './WeatherAtmosphere'
export { CompactSevenDay, type DayForecast } from './CompactSevenDay'
export { ConditionsTiles } from './ConditionsTiles'
export { RadarPreview } from './RadarPreview'
export { DaylightBar } from './DaylightBar'
export { NowDisplay } from './NowDisplay'
export { DecisionRail } from './DecisionRail'

// ============================================================================
// Layout & UI Elements
// ============================================================================
export { SectionDivider } from './SectionDivider'
export { InfoPopup, type InfoContent } from './InfoPopup'
export { CollapsibleDeck } from './CollapsibleDeck'

// ============================================================================
// Task Scores
// ============================================================================
export { TaskScores } from './TaskScores'
export {
  InfoButton,
  WorkabilityExplainer,
  SCORE_EXPLANATIONS,
  type ScoreExplanation,
} from './ScoreExplainer'

// ============================================================================
// Environmental Monitors
// ============================================================================
export { MoonPhase } from './MoonPhase'
export { default as SoilTemperature } from './SoilTemperature'
export { default as VPDGauge } from './VPDGauge'
export { default as GDDTracker } from './GDDTracker'
export { default as FrostCountdown } from './FrostCountdown'
export { default as SnowConditions } from './SnowConditions'
export { default as SunBarometer } from './SunBarometer'
export { default as NativePulse } from './NativePulse'
export { default as PlantingIntelligence } from './PlantingIntelligence'

// ============================================================================
// Alerts & Safety
// ============================================================================
export { default as NWSAlertBanner } from './NWSAlertBanner'
export { default as LightningWatch } from './LightningWatch'
export { default as AirQualityCard } from './AirQualityCard'
export { default as BurnDayIndicator } from './BurnDayIndicator'

// ============================================================================
// Regional Data
// ============================================================================
export { default as CreekWatch } from './CreekWatch'
export { default as DroughtStatus } from './DroughtStatus'
export { default as SpringIndex } from './SpringIndex'
export { default as EnvironmentalWatch } from './EnvironmentalWatch'
export { default as PrecipitationRadar } from './PrecipitationRadar'
export { default as FarmerMemory } from './FarmerMemory'
export { FarmerMemorySummary } from './FarmerMemorySummary'

// ============================================================================
// Sayings & Content
// ============================================================================
export { FrontierSaying } from './FrontierSaying'
export { default as RotatingHook } from './RotatingHook'

// ============================================================================
// Top-Level Layout
// ============================================================================
export { TopBar } from './TopBar'
export { NextChangeHero } from './NextChangeHero'

// ============================================================================
// User Interface
// ============================================================================
export { default as LocationPicker } from './LocationPicker'
export { default as OnboardingModal } from './OnboardingModal'
export { default as AboutModal } from './AboutModal'
export { default as ShareButton } from './ShareButton'
export { default as StaleDataWarning } from './StaleDataWarning'
export { default as PresentedByBlock } from './PresentedByBlock'

// ============================================================================
// Info Content (re-exported from lib/almanac for convenience)
// ============================================================================
export { INFO_CONTENT, type InfoContent as InfoContentData } from '@/lib/almanac/infoContent'

// ============================================================================
// Governor's View Components
// ============================================================================
export { BrassBarometer } from './BrassBarometer'
export { MercuryThermometer } from './MercuryThermometer'
export { CopperWeathervane } from './CopperWeathervane'
export { GovernorsBriefing } from './GovernorsBriefing'
export { ViewToggle } from './ViewToggle'

// ============================================================================
// Governor's View Logic (re-exported from lib/almanac for convenience)
// ============================================================================
export { generateGovernorsBriefing } from '@/lib/almanac/generateBriefing'
