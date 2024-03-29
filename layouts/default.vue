<template>
  <v-app>
    <v-toolbar app="" color="primary" dark="">
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click="isSidebar = !isSidebar"
      />
      <v-toolbar-title>
        <v-img src="/icon.png" width="30" alt="Ayo Rek Admin">
          <template #placeholder="">
            <v-layout fill-height="" align-center="" justify-center="" ma-0="">
              <v-progress-circular indeterminate="" color="grey lighten-5" />
            </v-layout>
          </template>
        </v-img>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only ml-4">
        <template v-for="(menu, i) in menus">
          <v-menu
            v-if="menu.subMenus"
            :key="`menu_toolbar_${i}`"
            offset-y=""
            bottom=""
          >
            <template #activator="{ on }">
              <v-btn flat="" :class="menu.id" v-on="on">
                <span>{{ menu.text }}</span>
                <v-icon dark>arrow_drop_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(menuSub, j) in menu.subMenus"
                :key="`menu_toolbar_${i}_sub_${j}`"
                ripple=""
                nuxt=""
                exact=""
                :class="menuSub.id"
                :to="menuSub.to"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ menuSub.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-btn
            v-else
            :key="`menu_toolbar_${i}`"
            flat=""
            nuxt=""
            exact=""
            :to="menu.to"
          >
            {{ menu.text }}
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items>
        <v-menu offset-y="">
          <template #activator="{ on }">
            <v-btn class="aio-menu-account" flat="" v-on="on">
              <app-avatar
                :name="avatarName"
                :image="user.image"
                size="36"
                class="mr-3"
              />
              <span class="hidden-xs-only">{{ avatarName }}</span>
              <v-icon right="">arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-if="$route.name.includes('device')"
              ripple=""
              @click="onSettings"
            >
              <v-list-tile-content>
                <v-list-tile-title>Settings</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="aio-menu-logout" ripple="" @click="onLogout">
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid="" grid-list-xl="">
        <v-layout>
          <v-flex xs12="">
            <nuxt />
            <app-notification />
            <app-loading :value="isModelsLoading">
              Loading face recognition models
            </app-loading>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import AppNotification from '~/components/AppNotification'
import AppAvatar from '~/components/AppAvatar'
import AppLoading from '~/components/AppLoading'

import { types as deviceTypes } from '~/store/device'

const Cookie = process.client ? require('js-cookie') : null

export default {
  middleware: 'non-auth',
  components: {
    AppNotification,
    AppAvatar,
    AppLoading
  },
  data() {
    return {
      isSidebar: false
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('face', {
      isModelsLoading: 'isLoading'
    }),
    avatarName() {
      if (this.user.role === 'admin') {
        return 'Admin'
      } else if (this.user.role === 'device') {
        return 'Device'
      }
      return this.user.profile.name
    },
    menus() {
      return [
        { id: 'aio-menu-home', text: 'Home', to: { name: 'admin' } },
        {
          id: 'aio-menu-datasets',
          text: 'Datasets',
          subMenus: [
            {
              id: 'aio-menu-rooms',
              text: 'Rooms',
              to: { name: 'admin-rooms' }
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initToken()
    },
    initToken() {
      const token = Cookie.get('t')
      const { name } = this.$route
      const { role } = this.user
      if (token) {
        this.$http.setToken(token, 'Bearer')
        if (name && role && !name.includes(role)) {
          this.$router.replace({ name: role })
        }
      }
    },
    onSettings() {
      this.$store.commit(`device/${deviceTypes.SET_CONFIGURING}`, true)
    },
    onLogout() {
      Cookie.remove('t')
      this.$http.setToken(false)
      window.location.reload(true)
    }
  }
}
</script>
