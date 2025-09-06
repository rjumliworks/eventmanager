<script>
import {
  layoutComputed
} from "@/state/helpers";

export default {
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
  computed: {
    ...layoutComputed,
    layoutType: {
      get() {
        return this.$store ? this.$store.state.layout.layoutType : {} || {};
      },
    },
  },

  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },


  mounted() {
    this.initActiveMenu();
    if (this.rmenu == 'vertical' && this.layoutType == 'twocolumn') {
      document.documentElement.setAttribute("data-layout", "vertical");
    }
    // document.getElementById('overlay').addEventListener('click', () => {
    //   document.body.classList.remove('vertical-sidebar-enable');
    // });

    window.addEventListener("resize", () => {
      if (this.layoutType == 'twocolumn') {
        var windowSize = document.documentElement.clientWidth;
        if (windowSize < 767) {
          document.documentElement.setAttribute("data-layout", "vertical");
          this.rmenu = 'vertical';
          localStorage.setItem('rmenu', 'vertical');
        } else {
          document.documentElement.setAttribute("data-layout", "vertical");
          this.rmenu = 'twocolumn';
          localStorage.setItem('rmenu', 'twocolumn');
          setTimeout(() => {
            this.initActiveMenu();
          }, 50);

        }
      }
    });
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      let collapses = document.querySelectorAll(".navbar-nav .collapse");

      collapses.forEach((collapse) => {
        // Hide sibling collapses on `show.bs.collapse`
        collapse.addEventListener("show.bs.collapse", (e) => {
          e.stopPropagation();
          let closestCollapse = collapse.parentElement.closest(".collapse");
          if (closestCollapse) {
            let siblingCollapses =
              closestCollapse.querySelectorAll(".collapse");
            siblingCollapses.forEach((siblingCollapse) => {
              if (siblingCollapse.classList.contains("show")) {
                siblingCollapse.classList.remove("show");
                siblingCollapse.parentElement.firstChild.setAttribute("aria-expanded", "false");
              }
            });
          } else {
            let getSiblings = (elem) => {
              // Setup siblings array and get the first sibling
              let siblings = [];
              let sibling = elem.parentNode.firstChild;
              // Loop through each sibling and push to the array
              while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
              }
              return siblings;
            };
            let siblings = getSiblings(collapse.parentElement);
            siblings.forEach((item) => {
              if (item.childNodes.length > 2) {
                item.firstElementChild.setAttribute("aria-expanded", "false");
                item.firstElementChild.classList.remove("active");
              }
              let ids = item.querySelectorAll("*[id]");
              ids.forEach((item1) => {
                item1.classList.remove("show");
                item1.parentElement.firstChild.setAttribute("aria-expanded", "false");
                item1.parentElement.firstChild.classList.remove("active");
                if (item1.childNodes.length > 2) {
                  let val = item1.querySelectorAll("ul li a");

                  val.forEach((subitem) => {
                    if (subitem.hasAttribute("aria-expanded"))
                      subitem.setAttribute("aria-expanded", "false");
                  });
                }
              });
            });
          }
        });

        // Hide nested collapses on `hide.bs.collapse`
        collapse.addEventListener("hide.bs.collapse", (e) => {
          e.stopPropagation();
          let childCollapses = collapse.querySelectorAll(".collapse");
          childCollapses.forEach((childCollapse) => {
            let childCollapseInstance = childCollapse;
            childCollapseInstance.classList.remove("show");
            childCollapseInstance.parentElement.firstChild.setAttribute("aria-expanded", "false");
          });
        });
      });
    }
  },

  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0].offsetTop;
        if (currentPosition > 500)
          if (this.$refs.isSimplebar)
            this.$refs.isSimplebar.value.getScrollElement().scrollTop = currentPosition + 300;
      }
    },

    initActiveMenu() {
      const pathName = window.location.pathname;
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const items = Array.from(ul.querySelectorAll("a.nav-link"));
        let activeItems = items.filter((x) => x.classList.contains("active"));
        this.removeActivation(activeItems);
        let matchingMenuItem = items.find((x) => {
          return x.getAttribute("href") === pathName;
        });
        if (matchingMenuItem) {
          this.activateParentDropdown(matchingMenuItem);
        } else {
          var id = pathName.replace("/", "");
          if (id) document.body.classList.add("twocolumn-panel");
          this.activateIconSidebarActive(pathName);
        }
      }
    },
    removeActivation(items) {
      items.forEach((item) => {
        if (item.classList.contains("menu-link")) {
          if (!item.classList.contains("active")) {
            item.setAttribute("aria-expanded", false);
          }
          item.nextElementSibling.classList.remove("show");
        }
        if (item.classList.contains("nav-link")) {
          if (item.nextElementSibling) {
            item?.nextElementSibling?.classList?.remove("show");
          }
          item.setAttribute("aria-expanded", false);
        }
        item.classList.remove("active");
      });
    },

    activateParentDropdown(item) {
      // navbar-nav menu add active
      item.classList.add("active");
      let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
      if (parentCollapseDiv) {
        // to set aria expand true remaining
        parentCollapseDiv.classList.add("show");
        parentCollapseDiv.parentElement.children[0].classList.add("active");
        parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
        if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
          if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling) {
            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown")) {
              const grandparent = parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").previousElementSibling.parentElement.closest(".collapse.menu-dropdown");
              this.activateIconSidebarActive("#" + grandparent.getAttribute("id"));
              grandparent.classList.add("show");
            }
          }
          this.activateIconSidebarActive("#" + parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")
            .getAttribute("id"));

          parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
          if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
            parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
          return false;
        }
        this.activateIconSidebarActive("#" + parentCollapseDiv.getAttribute("id"));
        return false;
      }
      return false;
    },
    activateIconSidebarActive(id) {
      var menu = document.querySelector(
        "#two-column-menu .simplebar-content-wrapper a[href='" +
        id +
        "'].nav-icon"
      );
      if (menu !== null) {
        menu.classList.add("active");
      }
    },
  },
};
</script>

<template>
  <BContainer fluid>
    <div id="two-column-menu"></div>

    <template v-if="layoutType === 'vertical' || layoutType === 'semibox'">
      <ul class="navbar-nav h-100" id="navbar-nav">
        <li class="menu-title">
          <span data-key="t-menu"> {{ $t("t-menu") }}</span>
        </li>
        <li class="nav-item">
          <BLink class="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarDashboards">
            <i class="ri-dashboard-2-line"></i>
            <span data-key="t-dashboards"> {{ $t("t-dashboards") }}</span>
          </BLink>
          <div class="collapse menu-dropdown" id="sidebarDashboards">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link to="/" class="nav-link" data-key="t-ecommerce">
                  {{ $t("t-ecommerce") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <!-- end Dashboard Menu -->

        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="t-pages">{{ $t("t-pages") }}</span>
        </li>

        <li class="nav-item">
          <BLink class="nav-link menu-link" href="#sidebarAuth" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarAuth">
            <i class="ri-account-circle-line"></i>
            <span data-key="t-authentication">{{
              $t("t-authentication")
            }}</span>
          </BLink>
          <div class="collapse menu-dropdown" id="sidebarAuth">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <BLink class="nav-link" href="#sidebarSignIn" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarSignIn" data-key="t-signin">{{ $t("t-signin") }}
                </BLink>
                <div class="collapse menu-dropdown" id="sidebarSignIn">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link to="/auth/signin-basic" class="nav-link" data-key="t-basic">{{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/auth/signin-cover" class="nav-link" data-key="t-cover">{{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <BLink class="nav-link" href="#sidebarSignUp" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarSignUp" data-key="t-signup">{{ $t("t-signup") }}
                </BLink>
                <div class="collapse menu-dropdown" id="sidebarSignUp">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link to="/auth/signup-basic" class="nav-link" data-key="t-basic">{{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/auth/signup-cover" class="nav-link" data-key="t-cover">{{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <BLink class="nav-link" href="#sidebarLogout" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarLogout" data-key="t-logout">
                  {{ $t("t-logout") }}
                </BLink>
                <div class="collapse menu-dropdown" id="sidebarLogout">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link to="/auth/logout-basic" class="nav-link" data-key="t-basic">
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/auth/logout-cover" class="nav-link" data-key="t-cover">
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <BLink class="nav-link" href="#sidebarErrors" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarErrors" data-key="t-errors">
                  {{ $t("t-errors") }}
                </BLink>
                <div class="collapse menu-dropdown" id="sidebarErrors">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link to="/auth/404-basic" class="nav-link" data-key="t-404-basic">
                        {{ $t("t-404-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/auth/404-cover" class="nav-link" data-key="t-404-cover">
                        {{ $t("t-404-cover") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/auth/404" class="nav-link" data-key="t-404-alt">
                        {{ $t("t-404-alt") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/auth/500" class="nav-link" data-key="t-500">
                        {{ $t("t-500") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link to="/auth/ofline" class="nav-link" data-key="t-offline-page">
                        {{ $t("t-offline-page") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span data-key="t-components">{{ $t("t-components") }}</span>
        </li>
        
        <li class="nav-item">
          <BLink class="nav-link menu-link" href="#sidebarMultilevel" data-bs-toggle="collapse" role="button"
            aria-expanded="false" aria-controls="sidebarMultilevel">
            <i class="ri-share-line"></i>
            <span data-key="t-multi-level">{{ $t("t-multi-level") }}</span>
          </BLink>
          <div class="collapse menu-dropdown" id="sidebarMultilevel">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <BLink class="nav-link" data-key="t-level-1.1">
                  {{ $t("t-level-1.1") }}
                </BLink>
              </li>
              <li class="nav-item">
                <BLink class="nav-link" href="#sidebarAccount" data-bs-toggle="collapse" role="button"
                  aria-expanded="false" aria-controls="sidebarAccount" data-key="t-level-1.2">
                  {{ $t("t-level-1.2") }}
                </BLink>
                <div class="collapse menu-dropdown" id="sidebarAccount">
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <BLink class="nav-link" data-key="t-level-2.1">
                        {{ $t("t-level-2.1") }}
                      </BLink>
                    </li>
                    <li class="nav-item">
                      <BLink class="nav-link" href="#sidebarlevel" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="sidebarlevel" data-key="t-level-2.2">
                        {{ $t("t-level-2.2") }}
                      </BLink>
                      <div class="collapse menu-dropdown" id="sidebarlevel">
                        <ul class="nav nav-sm flex-column">
                          <li class="nav-item">
                            <BLink class="nav-link" data-key="t-level-3.1">
                              {{ $t("t-level-3.1") }}
                            </BLink>
                          </li>
                          <li class="nav-item">
                            <BLink class="nav-link" data-key="t-level-3.2">
                              {{ $t("t-level-3.2") }}
                            </BLink>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </template>
  </BContainer>
</template>