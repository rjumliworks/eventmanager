<script>
import NavBar from "@/components/nav-bar";
import RightBar from "@/components/right-bar";
import Footer from "@/components/footer";

export default {
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
    },
    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document
            .querySelector("#navbar-nav")
            .querySelector('[href="' + ele + '"]');

          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add(
                "active"
              );
              parentCollapseDiv.parentElement.children[0].setAttribute(
                "aria-expanded",
                "true"
              );
              if (
                parentCollapseDiv.parentElement.closest(
                  ".collapse.menu-dropdown"
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest(".collapse")
                  .classList.add("show");
                if (
                  parentCollapseDiv.parentElement.closest(".collapse")
                    .previousElementSibling
                )
                  parentCollapseDiv.parentElement
                    .closest(".collapse")
                    .previousElementSibling.classList.add("active");
              }
            }
          }
        }
      }, 1000);
    },
  },
  mounted() {
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
  components: {
    NavBar,
    RightBar,
    Footer
  },
};
</script>

<template>
  <div>
    <div id="layout-wrapper">
      <NavBar />
      <!-- ========== App Menu ========== -->
      <div class="app-menu navbar-menu">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <!-- Dark Logo-->
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt="" height="17" />
            </span>
          </router-link>
          <!-- Light Logo-->
          <router-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt="" height="17" />
            </span>
          </router-link>
          <BButton size="sm"  class="
              p-0
              fs-20
              header-item
              float-end
              btn-vertical-sm-hover
            " id="vertical-hover">
            <i class="ri-record-circle-line"></i>
          </BButton>
        </div>
        <div id="scrollbar">
          <BContainer fluid>
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
                            <router-link to="/auth/ofline" class="nav-link" data-key="t-ofline-page">
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
                <BLink class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false"
                  aria-controls="sidebarMore">
                  <i class="ri-briefcase-2-line"></i> More
                </BLink>
                <div class="collapse menu-dropdown show" id="sidebarMore">
                  <ul class="nav nav-sm flex-column">

                    <li class="nav-item">
                      <BLink class="nav-link menu-link" href="#sidebarMultilevel" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="sidebarMultilevel">
                        <i class="ri-share-line"></i>
                        <span data-key="t-multi-level">{{
                          $t("t-multi-level")
                        }}</span>
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
                                  <BLink class="nav-link" href="#sidebarCrm" data-bs-toggle="collapse" role="button"
                                    aria-expanded="false" aria-controls="sidebarCrm" data-key="t-level-2.2">
                                    {{ $t("t-level-2.2") }}
                                  </BLink>
                                  <div class="collapse menu-dropdown" id="sidebarCrm">
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
                </div>
              </li>
            </ul>
          </BContainer>
          <!-- Sidebar -->
        </div>
        <!-- Left Sidebar End -->
        <!-- Vertical Overlay-->
        <div class="vertical-overlay"></div>
      </div>
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <BContainer fluid>
            <slot />
          </BContainer>
        </div>
        <Footer />
      </div>
      <RightBar />
    </div>
  </div>
</template>