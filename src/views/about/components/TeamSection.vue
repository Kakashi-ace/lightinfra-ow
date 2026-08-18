<template>
  <section class="team-section">
    <div class="section-container">
      <h2 class="section-title">{{ t('about.teamTitle') }}</h2>
      <p class="section-subtitle">{{ t('about.subtitle') }}</p>
      <div class="team-scroll">
        <div class="team-grid">
          <div
            v-for="(member, index) in team"
            :key="index"
            class="team-card"
          >
            <div class="team-avatar">
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <circle cx="80" cy="80" r="80" fill="rgba(0,115,255,0.3)" />
                <circle cx="80" cy="60" r="30" fill="rgba(0,115,255,0.5)" />
                <ellipse cx="80" cy="140" rx="50" ry="40" fill="rgba(0,115,255,0.5)" />
              </svg>
            </div>
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  team: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.section-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  color: #121212;
  margin: 0 0 16px 0;
}

.section-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0 0 60px 0;
}

.team-section {
  padding: 120px 0;
}

.team-scroll {
  width: 100%;
  overflow-x: auto;
  margin: 0 -20px;
  padding: 0 20px;
}

.team-scroll::-webkit-scrollbar {
  height: 0;
}

.team-grid {
  display: flex;
  gap: 41px;
  width: max-content;
}

.team-card {
  width: 384px;
  height: 387px;
  background: linear-gradient(180deg, rgba(164,205,255,0.59) 0%, rgba(0,115,255,0.59) 100%);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: all 0.2s ease;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 115, 255, 0.2);
}

.team-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
}

.team-name {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #FFFFFF;
  margin: 0;
  text-align: center;
}

.team-role {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: center;
}
</style>
