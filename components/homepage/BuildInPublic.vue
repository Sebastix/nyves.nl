<script setup>
// Build in Public component voor Nyves homepage
</script>

<template>
  <section class="mb-8">
    <div class="max-w-6xl mx-auto">
      <!-- Sectie Header -->
      <div class="text-center mb-4">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Build in <span class="text-nyves-orange">Public</span>
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Volg het proces van het project in real-time.
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid md:grid-cols-2">
        
        <!-- GitLab Repository Card -->
        <div class="bg-linear-to-br from-orange-50 to-red-50 p-8">
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center space-x-3">
              <!-- GitLab Icon -->
              <div class="w-12 h-12 bg-nyves-orange rounded-lg flex items-center justify-center">
                <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Code Repository</h3>
                <p class="text-gray-600 text-sm">Open source ontwikkeling</p>
              </div>
            </div>
            
            <!-- External link icon -->
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          <div class="space-y-4 mb-6">
            <p class="text-gray-700 leading-relaxed">
              Bekijk de volledige <strong>broncode</strong> van Nyves op GitLab. 
              De werking van de applicatie is volledig transparant.
            </p>
            
            <!-- Features -->
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Nuxt.js web applicatie</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Nostr protocol implementatie</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Contributions zijn welkom, AGPLv2</span>
              </li>
            </ul>
          </div>
          <a
              href="https://gitworkshop.dev/relay.nyves.nl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-6 py-3 bg-nyves-orange text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Grasp
          </a>
          <a 
            href="https://gitlab.com/sebastix-group/nyves" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center ml-2 px-6 py-3 bg-nyves-orange text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            GitLab
          </a>
        </div>

        <!-- Project Management Card -->
        <div class="bg-linear-to-br from-blue-50 to-indigo-50 p-8">
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center space-x-3">
              <!-- Taiga/Project Management Icon -->
              <div class="w-12 h-12 bg-nyves-blue rounded-lg flex items-center justify-center">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 12h.01M12 16h.01" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Project management</h3>
                <p class="text-gray-600 text-sm">Live te volgen via ons Taiga board</p>
              </div>
            </div>
            
            <!-- External link icon -->
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>

          <div class="space-y-4 mb-6">
            <p class="text-gray-700 leading-relaxed">
              Bekijk de <strong>voortgang</strong> live via ons Taiga dashboard.
              Zie welke features in ontwikkeling zijn en wat er op de roadmap staat.
            </p>
            
            <!-- Features -->
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Project timeline</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Epics met een kanban bord</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Overzicht met issues</span>
              </li>
            </ul>
          </div>

          <a 
            href="https://taiga.sebastix.dev/project/nyves/timeline" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center px-6 py-3 bg-nyves-blue text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Bekijk project dashboard
          </a>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="text-center">
        <div class="bg-gray-50 p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            <span class="text-nyves-orange">Transparantie</span> & <span class="text-nyves-blue">Samenwerking</span>
          </h3>
          <p class="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Door <strong>build in public</strong> te werken, delen we niet alleen onze code, maar ook ons proces. 
            Dit zorgt voor vertrouwen, kan iedereen ervan leren en nodigt anderen uit tot samenwerking.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>