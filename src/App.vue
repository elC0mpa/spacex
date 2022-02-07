<template>
  <router-view />
  <metainfo>
    <template v-slot:title="{ content }">{{ content }} - SpaceX</template>
  </metainfo>
</template>

