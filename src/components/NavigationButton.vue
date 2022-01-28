<template>
  <div class="navigation">
    <input
      type="checkbox"
      class="navigation__checkbox"
      ref="button"
      id="navi-toggle"
      @click="buttonClicked"
    />

    <label for="navi-toggle" class="navigation__button">
      <span class="navigation__icon">&nbsp;</span>
    </label>

    <div class="navigation__background">&nbsp;</div>

    <nav class="navigation__nav">
      <ul class="navigation__list">
        <li
          class="navigation__item"
          v-for="(item, index) in items"
          :key="index"
        >
          <a href="#" @click.prevent="navigate(item)" class="navigation__link"
            ><span>{{ item.label }}</span></a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "NavigationButton",
  props: {
    items: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const button = ref(null);
    const router = useRouter();
    const state = reactive({
      buttonPressed: false,
    });
    const navigate = (item) => {
      button.value.click();
      if (item.external) {
        window.open(item.to);
      } else {
        router.push({
          path: item.to,
        });
      }
    };
    const buttonClicked = () => {
      state.buttonPressed = !state.buttonPressed;
    };
    return { props, navigate, button, ...toRefs(state), buttonClicked };
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  &__checkbox {
    display: none;
  }

  &__button {
    background-color: $color-white;
    height: 7rem;
    width: 7rem;
    position: fixed;
    top: 6rem;
    right: 6rem;
    border-radius: 50%;
    z-index: 2000;
    box-shadow: 0 1rem 3rem rgba($color-black, 0.1);
    text-align: center;
    cursor: pointer;

    @include responsive(medium-bp) {
      top: 4rem;
      right: 4rem;
    }

    @include responsive(small-bp) {
      top: 3rem;
      right: 3rem;
    }
  }

  &__background {
    height: 6rem;
    width: 6rem;
    border-radius: 50%;
    position: fixed;
    top: 6.5rem;
    right: 6.5rem;
    background-image: radial-gradient(
      $color-primary-light,
      $color-primary-dark
    );
    z-index: 1000;
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);

    @include responsive(medium-bp) {
      top: 4.5rem;
      right: 4.5rem;
    }

    @include responsive(small-bp) {
      top: 3.5rem;
      right: 3.5rem;
    }
  }

  &__nav {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1500;

    opacity: 0;
    width: 0;
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &__list {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    list-style: none;
    text-align: center;
    width: 100%;
  }

  &__item {
    margin: 1rem;
    visibility: hidden;
  }

  &__link {
    &:link,
    &:visited {
      display: inline-block;
      font-size: 3rem;
      font-weight: 300;
      padding: 1rem 2rem;
      color: $color-white;
      text-decoration: none;
      text-transform: uppercase;
      background-size: 220%;
      transition: all 0.4s;

      span {
        margin-right: 1.5rem;
        display: inline-block;
      }
    }

    &:hover,
    &:active {
      background-position: 100%;
      background: white;
      color: $color-primary;
      transform: translateX(1rem);
    }
  }

  //FUNCTIONALITY
  &__checkbox:checked ~ &__background {
    transform: scale(80);
  }

  &__checkbox:checked ~ &__nav {
    opacity: 1;
    width: 100%;
    > ul > li {
      visibility: visible;
    }
  }

  //ICON
  &__icon {
    position: relative;
    margin-top: 3.5rem;

    &,
    &::before,
    &::after {
      width: 3rem;
      height: 2px;
      background-color: $color-grey-dark-3;
      display: inline-block;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      transition: all 0.2s;
    }

    &::before {
      top: -0.8rem;
    }
    &::after {
      top: 0.8rem;
    }
  }

  &__button:hover &__icon::before {
    top: -1rem;
  }

  &__button:hover &__icon::after {
    top: 1rem;
  }

  &__checkbox:checked + &__button &__icon {
    background-color: transparent;
  }

  &__checkbox:checked + &__button &__icon::before {
    top: 0;
    transform: rotate(135deg);
  }

  &__checkbox:checked + &__button &__icon::after {
    top: 0;
    transform: rotate(-135deg);
  }
}
</style>
