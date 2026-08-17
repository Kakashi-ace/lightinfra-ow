<template>
  <div class="resource-page">
    <!-- 顶部导航栏 -->
    <div class="navbar-bg">
      <AppNavbar />
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧产品导航栏 -->
      <aside class="product-nav">
        <!-- 三个标签按钮 -->
        <div class="aside-tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="aside-tab-item"
            :class="{ 'aside-tab-active': activeTab === tab }"
            @click="handleTabChange(tab)"
          >
            {{ tab }}
          </button>
        </div>

        <!-- 下载板块导航 -->
        <div v-if="activeTab === '下载'" class="nav-content">
          <div
            class="product-nav-item"
            :class="{ 'product-nav-active': activeProduct === 'OpticsGPT' }"
            @click="handleProductChange('OpticsGPT')"
          >
            OpticsGPT
          </div>
          <div
            class="product-nav-item"
            :class="{ 'product-nav-active': activeProduct === 'IFTS' }"
            @click="handleProductChange('IFTS')"
          >
            IFTS
          </div>
        </div>

        <!-- 文档板块导航 -->
        <div v-if="activeTab === '文档'" class="nav-content">
          <div
            class="product-nav-item"
            :class="{ 'product-nav-active': activeProduct === 'OpticsGPT' }"
            @click="handleDocNavClick('OpticsGPT', 'opticsgpt-manual')"
          >
            OpticsGPT
          </div>
          <div class="product-nav-sub-item" @click="handleDocNavClick('OpticsGPT', 'opticsgpt-manual')">使用手册</div>
          <div class="product-nav-sub-item" @click="handleDocNavClick('OpticsGPT', 'opticsgpt-changelog')">更新日志</div>
          <div
            class="product-nav-item"
            :class="{ 'product-nav-active': activeProduct === 'IFTS' }"
            @click="handleDocNavClick('IFTS', 'intro')"
          >
            IFTS
          </div>
          <div
            class="product-nav-sub-item product-nav-level2"
            :class="{ 'product-nav-sub-active': activeDocSection === 'code-docs' }"
            @click="handleDocNavClick('IFTS', 'code-docs')"
          >
            代码说明文档
          </div>
          <div
            class="product-nav-sub-item product-nav-level3"
            :class="{ 'product-nav-sub-active': activeDocSection === 'intro' }"
            @click="handleDocNavClick('IFTS', 'intro')"
          >
            简介
          </div>
          <div
            class="product-nav-sub-item product-nav-level3"
            :class="{ 'product-nav-sub-active': activeDocSection === 'base-module' }"
            @click="handleDocNavClick('IFTS', 'base-module')"
          >
            Base Module
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'base-dsp' }"
            @click="handleDocNavClick('IFTS', 'base-dsp')"
          >
            base_dsp
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'base-optics' }"
            @click="handleDocNavClick('IFTS', 'base-optics')"
          >
            base_optics
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'base-para' }"
            @click="handleDocNavClick('IFTS', 'base-para')"
          >
            base_para
          </div>
          <div
            class="product-nav-sub-item product-nav-level3"
            :class="{ 'product-nav-sub-active': activeDocSection === 'signal-module' }"
            @click="handleDocNavClick('IFTS', 'signal-module')"
          >
            Signal
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'data-gen' }"
            @click="handleDocNavClick('IFTS', 'data-gen')"
          >
            data_gen
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'rng-gen' }"
            @click="handleDocNavClick('IFTS', 'rng-gen')"
          >
            rng_gen
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'sym-gen' }"
            @click="handleDocNavClick('IFTS', 'sym-gen')"
          >
            sym_gen
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'modulation' }"
            @click="handleDocNavClick('IFTS', 'modulation')"
          >
            modulation
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn' }"
            @click="handleDocNavClick('IFTS', 'nn')"
          >
            nn
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'pam' }"
            @click="handleDocNavClick('IFTS', 'pam')"
          >
            pam
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'qam' }"
            @click="handleDocNavClick('IFTS', 'qam')"
          >
            qam
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'demod-design' }"
            @click="handleDocNavClick('IFTS', 'demod-design')"
          >
            demod_design
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'constellations' }"
            @click="handleDocNavClick('IFTS', 'constellations')"
          >
            constellations
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'qammap' }"
            @click="handleDocNavClick('IFTS', 'qammap')"
          >
            qammap
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'gs-qammap' }"
            @click="handleDocNavClick('IFTS', 'gs-qammap')"
          >
            gs_qammap
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'perf-calculation' }"
            @click="handleDocNavClick('IFTS', 'perf-calculation')"
          >
            perf_calculation
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ber' }"
            @click="handleDocNavClick('IFTS', 'ber')"
          >
            ber
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'mi' }"
            @click="handleDocNavClick('IFTS', 'mi')"
          >
            mi
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'gmi' }"
            @click="handleDocNavClick('IFTS', 'gmi')"
          >
            gmi
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'q-factor' }"
            @click="handleDocNavClick('IFTS', 'q-factor')"
          >
            q_factor
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ser' }"
            @click="handleDocNavClick('IFTS', 'ser')"
          >
            ser
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ber-awgn' }"
            @click="handleDocNavClick('IFTS', 'ber-awgn')"
          >
            ber_awgn
          </div>
          <div
            class="product-nav-sub-item product-nav-level3"
            :class="{ 'product-nav-sub-active': activeDocSection === 'channel-module' }"
            @click="handleDocNavClick('IFTS', 'channel-module')"
          >
            Channel
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'channel-para' }"
            @click="handleDocNavClick('IFTS', 'channel-para')"
          >
            channel_para
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ch-para-init' }"
            @click="handleDocNavClick('IFTS', 'ch-para-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ch-para-trans' }"
            @click="handleDocNavClick('IFTS', 'ch-para-trans')"
          >
            __transmitter_para__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ch-para-wss' }"
            @click="handleDocNavClick('IFTS', 'ch-para-wss')"
          >
            __wss_para__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ch-para-edfa' }"
            @click="handleDocNavClick('IFTS', 'ch-para-edfa')"
          >
            __edfa_para__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ch-para-recv' }"
            @click="handleDocNavClick('IFTS', 'ch-para-recv')"
          >
            __receiver_para__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ch-para-fiber' }"
            @click="handleDocNavClick('IFTS', 'ch-para-fiber')"
          >
            __fiber_para__
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'coherent-receiver' }"
            @click="handleDocNavClick('IFTS', 'coherent-receiver')"
          >
            coherent_receiver
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'coh-recv-init' }"
            @click="handleDocNavClick('IFTS', 'coh-recv-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'coh-recv-init-fn' }"
            @click="handleDocNavClick('IFTS', 'coh-recv-init-fn')"
          >
            init
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'coh-recv-forward' }"
            @click="handleDocNavClick('IFTS', 'coh-recv-forward')"
          >
            forward_pass
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'coh-recv-naive' }"
            @click="handleDocNavClick('IFTS', 'coh-recv-naive')"
          >
            __naive_pass__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'coh-recv-noise' }"
            @click="handleDocNavClick('IFTS', 'coh-recv-noise')"
          >
            __add_noise__
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa' }"
            @click="handleDocNavClick('IFTS', 'edfa')"
          >
            EDFA
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa-init' }"
            @click="handleDocNavClick('IFTS', 'edfa-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa-forward' }"
            @click="handleDocNavClick('IFTS', 'edfa-forward')"
          >
            forward_pass
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa-naive' }"
            @click="handleDocNavClick('IFTS', 'edfa-naive')"
          >
            __naive_pass__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa-no-noise' }"
            @click="handleDocNavClick('IFTS', 'edfa-no-noise')"
          >
            __no_noise_pass__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa-noise-power' }"
            @click="handleDocNavClick('IFTS', 'edfa-noise-power')"
          >
            __calcu_noise_power__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa-amplifier' }"
            @click="handleDocNavClick('IFTS', 'edfa-amplifier')"
          >
            __amplifier__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'edfa-add-noise' }"
            @click="handleDocNavClick('IFTS', 'edfa-add-noise')"
          >
            __add_noise__
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm' || activeDocSection === 'ssfm-calc-funcs' }"
            @click="handleDocNavClick('IFTS', 'ssfm')"
          >
            SSFM Module
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm' }"
            @click="handleDocNavClick('IFTS', 'ssfm')"
          >
            SSFM
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-init' }"
            @click="handleDocNavClick('IFTS', 'ssfm-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-init-fn' }"
            @click="handleDocNavClick('IFTS', 'ssfm-init-fn')"
          >
            init
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-pmd-init' }"
            @click="handleDocNavClick('IFTS', 'ssfm-pmd-init')"
          >
            __pmd_init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-step-init' }"
            @click="handleDocNavClick('IFTS', 'ssfm-step-init')"
          >
            __step_init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-func-para-init' }"
            @click="handleDocNavClick('IFTS', 'ssfm-func-para-init')"
          >
            __func_para_init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-forward' }"
            @click="handleDocNavClick('IFTS', 'ssfm-forward')"
          >
            forward_pass
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-scalar' }"
            @click="handleDocNavClick('IFTS', 'ssfm-scalar')"
          >
            __ssfm_scalar__
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-matrix' }"
            @click="handleDocNavClick('IFTS', 'ssfm-matrix')"
          >
            __ssfm_matrix__
          </div>
          <div
            class="product-nav-sub-item product-nav-level7"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-calcu-p' }"
            @click="handleDocNavClick('IFTS', 'ssfm-calcu-p')"
          >
            __calcu_p__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-calc-funcs' }"
            @click="handleDocNavClick('IFTS', 'ssfm-calc-funcs')"
          >
            SSFM calculation functions
          </div>
          <div
            class="product-nav-sub-item product-nav-level6"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-linearity-scalar' }"
            @click="handleDocNavClick('IFTS', 'ssfm-linearity-scalar')"
          >
            linearity_scalar
          </div>
          <div
            class="product-nav-sub-item product-nav-level6"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-nonlinearity-scalar' }"
            @click="handleDocNavClick('IFTS', 'ssfm-nonlinearity-scalar')"
          >
            nonlinearity_scalar
          </div>
          <div
            class="product-nav-sub-item product-nav-level6"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-linearity-matrix' }"
            @click="handleDocNavClick('IFTS', 'ssfm-linearity-matrix')"
          >
            linearity_matrix
          </div>
          <div
            class="product-nav-sub-item product-nav-level6"
            :class="{ 'product-nav-sub-active': activeDocSection === 'ssfm-nonlinearity-matrix' }"
            @click="handleDocNavClick('IFTS', 'ssfm-nonlinearity-matrix')"
          >
            nonlinearity_matrix
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'step-size' }"
            @click="handleDocNavClick('IFTS', 'step-size')"
          >
            Step_Size
          </div>
          <div
            class="product-nav-sub-item product-nav-level5-68"
            :class="{ 'product-nav-sub-active': activeDocSection === 'step-size-init' }"
            @click="handleDocNavClick('IFTS', 'step-size-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5-68 product-nav-level-active"
            :class="{ 'product-nav-sub-active': activeDocSection === 'step-size-step' }"
            @click="handleDocNavClick('IFTS', 'step-size-step')"
          >
            step
          </div>
          <div
            class="product-nav-sub-item product-nav-level5-68"
            :class="{ 'product-nav-sub-active': activeDocSection === 'step-size-check' }"
            @click="handleDocNavClick('IFTS', 'step-size-check')"
          >
            __check_step_size__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5-68"
            :class="{ 'product-nav-sub-active': activeDocSection === 'step-size-nl-phase' }"
            @click="handleDocNavClick('IFTS', 'step-size-nl-phase')"
          >
            __nonlinear_phase_step__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5-68"
            :class="{ 'product-nav-sub-active': activeDocSection === 'step-size-log' }"
            @click="handleDocNavClick('IFTS', 'step-size-log')"
          >
            __log_step__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5-68"
            :class="{ 'product-nav-sub-active': activeDocSection === 'step-size-np-log' }"
            @click="handleDocNavClick('IFTS', 'step-size-np-log')"
          >
            __np_log_step__
          </div>
          <div
            class="product-nav-sub-item product-nav-level4 product-nav-level-active"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss' }"
            @click="handleDocNavClick('IFTS', 'wss')"
          >
            WSS
          </div>
          <div
            class="product-nav-sub-item product-nav-level5 product-nav-level-active"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-init' }"
            @click="handleDocNavClick('IFTS', 'wss-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-init-fn' }"
            @click="handleDocNavClick('IFTS', 'wss-init-fn')"
          >
            init
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-filter' }"
            @click="handleDocNavClick('IFTS', 'wss-filter')"
          >
            __filter_in_freq__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-transfer' }"
            @click="handleDocNavClick('IFTS', 'wss-transfer')"
          >
            __get_transfer_func__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-mux' }"
            @click="handleDocNavClick('IFTS', 'wss-mux')"
          >
            wdm_multiplexing
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-demux' }"
            @click="handleDocNavClick('IFTS', 'wss-demux')"
          >
            wdm_demultiplexing
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-init' }"
            @click="handleDocNavClick('IFTS', 'wss-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-init-fn' }"
            @click="handleDocNavClick('IFTS', 'wss-init-fn')"
          >
            init
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-transfer' }"
            @click="handleDocNavClick('IFTS', 'wss-transfer')"
          >
            get_transfer_func
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-filter' }"
            @click="handleDocNavClick('IFTS', 'wss-filter')"
          >
            filter_in_freq
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-mux' }"
            @click="handleDocNavClick('IFTS', 'wss-mux')"
          >
            wdm_multiplexing
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'wss-demux' }"
            @click="handleDocNavClick('IFTS', 'wss-demux')"
          >
            wdm_demultiplexing
          </div>
          <div
            class="product-nav-sub-item product-nav-level4 product-nav-level-active"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-module' }"
            @click="handleDocNavClick('IFTS', 'nn-module')"
          >
            NN Module
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-init' }"
            @click="handleDocNavClick('IFTS', 'nn-init')"
          >
            __init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-init-fn' }"
            @click="handleDocNavClick('IFTS', 'nn-init-fn')"
          >
            init
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-model-init' }"
            @click="handleDocNavClick('IFTS', 'nn-model-init')"
          >
            __nn_model_init__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-forward' }"
            @click="handleDocNavClick('IFTS', 'nn-forward')"
          >
            forward_pass
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-matrix' }"
            @click="handleDocNavClick('IFTS', 'nn-matrix')"
          >
            __nn_matrix__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-trans' }"
            @click="handleDocNavClick('IFTS', 'nn-trans')"
          >
            __trans_nn_matrix__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-data' }"
            @click="handleDocNavClick('IFTS', 'nn-data')"
          >
            __data_process__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-window' }"
            @click="handleDocNavClick('IFTS', 'nn-window')"
          >
            __sliding_window__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-real' }"
            @click="handleDocNavClick('IFTS', 'nn-real')"
          >
            __real_to_com__
          </div>
          <div
            class="product-nav-sub-item product-nav-level5"
            :class="{ 'product-nav-sub-active': activeDocSection === 'nn-com' }"
            @click="handleDocNavClick('IFTS', 'nn-com')"
          >
            __com_to_real__
          </div>
          <div
            class="product-nav-sub-item product-nav-level3"
            :class="{ 'product-nav-sub-active': activeDocSection === 'transmitter' }"
            @click="handleDocNavClick('IFTS', 'transmitter')"
          >
            Transmitter
          </div>
          <div
            class="product-nav-sub-item product-nav-level4"
            :class="{ 'product-nav-sub-active': activeDocSection === 'shaping' }"
            @click="handleDocNavClick('IFTS', 'shaping')"
          >
            shaping
          </div>
        </div>

        <!-- 帮助板块导航 -->
        <div v-if="activeTab === '帮助'" class="nav-content">
          <div class="product-nav-item product-nav-active">常见问题</div>
          <div class="product-nav-item">安装问题</div>
          <div class="product-nav-item">使用问题</div>
          <div class="product-nav-item">技术支持</div>
        </div>
      </aside>

      <!-- 中间内容区 -->
      <div class="content-middle">
        <!-- 下载内容 -->
        <template v-if="activeTab === '下载'">
          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <span>首页</span>
            <span class="separator">/</span>
            <span>资源</span>
            <span class="separator">/</span>
            <span class="current">{{ activeProduct }}</span>
          </div>

          <!-- 版本选择器 -->
          <div class="top-bar">
            <div class="version-selector" @click="$emit('version-change', 'v1.0')">
              <span class="version-text">Version v1.0</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 12L16 20L24 12" stroke="rgba(0,0,0,0.6)" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>

          <!-- 资源卡片区域 -->
          <div class="resource-cards">
            <div class="resource-card">
              <h3 class="card-title">模型</h3>
              <p class="card-desc">OpticsGPT 模型权重</p>
              <button class="download-btn" @click="$emit('download', { type: 'model' })">申请下载</button>
            </div>
            <div class="resource-card">
              <h3 class="card-title">评测集</h3>
              <p class="card-desc">光学领域评测集，包含从通用测试集中抽取的光学相关题目，根据光学相关论文生成的考题，光学专业研究生入学考试题目</p>
              <button class="download-btn" @click="$emit('download', { type: 'dataset' })">申请下载</button>
            </div>
            <div class="resource-card">
              <h3 class="card-title">API</h3>
              <p class="card-desc">Optics GPT 对话应用，包含应用源码和使用教程</p>
              <button class="download-btn" @click="$emit('download', { type: 'api' })">申请下载</button>
            </div>
          </div>
        </template>

        <!-- 文档页面 -->
        <template v-else-if="activeTab === '文档'">
          <!-- OpticsGPT 使用手册页面 -->
          <DocOpticsGPT
            v-if="activeDocSection === 'opticsgpt-manual'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS 简介页面 -->
          <IFTSDocPage
            v-else-if="activeDocSection === 'intro'"
            :activeProduct="activeProduct"
            :activeTab="activeTab"
            @update:activeTab="handleTabChange"
            @menuSelect="handleMenuSelect"
          />

          <!-- IFTS 代码说明文档页面 -->
          <IFTSDocPage
            v-else-if="activeDocSection === 'code-docs'"
            :activeProduct="activeProduct"
            :activeTab="activeTab"
            @update:activeTab="handleTabChange"
            @menuSelect="handleMenuSelect"
          />

          <!-- IFTS Base Module 页面 -->
          <DocBaseModule
            v-if="activeDocSection === 'base-module'"
            @pageNavSelect="handlePageNavSelect"
            @subModuleClick="handleSubModuleClick"
          />

          <!-- IFTS base_dsp 页面 -->
          <DocBaseDsp
            v-if="activeDocSection === 'base-dsp'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS base_optics 页面 -->
          <DocBaseOptics
            v-if="activeDocSection === 'base-optics'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS base_para 页面 -->
          <DocBasePara
            v-if="activeDocSection === 'base-para'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS Signal 模块页面 -->
          <DocSignal
            v-if="activeDocSection === 'signal-module'"
            @pageNavSelect="handlePageNavSelect"
            @subModuleClick="handleSubModuleClick"
          />

          <!-- IFTS Channel 模块页面 -->
          <DocChannel
            v-if="activeDocSection === 'channel-module'"
            @pageNavSelect="handlePageNavSelect"
            @subModuleClick="handleSubModuleClick"
          />

          <!-- IFTS channel_para 类说明页 -->
          <DocChannelPara
            v-if="activeDocSection === 'channel-para'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS channel_para __init__ 函数详情页 -->
          <DocChannelParaInit
            v-if="activeDocSection === 'ch-para-init'"
            @pageNavSelect="handlePageNavSelect"
            @copy="handleCopyCode"
          />

          <!-- IFTS channel_para __transmitter_para__ 函数详情页 -->
          <DocChannelParaTransmitterPara
            v-if="activeDocSection === 'ch-para-trans'"
            @pageNavSelect="handlePageNavSelect"
            @copy="handleCopyCode"
          />

          <!-- IFTS channel_para __wss_para__ 函数详情页 -->
          <DocChannelParaWssPara
            v-if="activeDocSection === 'ch-para-wss'"
            @pageNavSelect="handlePageNavSelect"
            @copy="handleCopyCode"
          />

          <!-- IFTS channel_para __edfa_para__ 函数详情页 -->
          <DocChannelParaEdfaPara
            v-if="activeDocSection === 'ch-para-edfa'"
            @pageNavSelect="handlePageNavSelect"
            @copy="handleCopyCode"
          />

          <!-- IFTS channel_para __receiver_para__ 函数详情页 -->
          <DocChannelParaReceiverPara
            v-if="activeDocSection === 'ch-para-recv'"
            @pageNavSelect="handlePageNavSelect"
            @copy="handleCopyCode"
          />

          <!-- IFTS channel_para __fiber_para__ 函数详情页 -->
          <DocChannelParaFiberPara
            v-if="activeDocSection === 'ch-para-fiber'"
            @pageNavSelect="handlePageNavSelect"
            @copy="handleCopyCode"
          />

          <!-- IFTS coherent_receiver 类说明页 -->
          <DocCoherentReceiver
            v-if="activeDocSection === 'coherent-receiver'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS coherent_receiver init 函数详情页 -->
          <DocCoherentReceiverInit
            v-if="activeDocSection === 'coh-recv-init-fn'"
            @copy="handleCopyCode"
          />

          <!-- IFTS coherent_receiver __init__ 函数详情页 -->
          <DocCoherentReceiverInitMethod
            v-if="activeDocSection === 'coh-recv-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS coherent_receiver forward_pass 函数详情页 -->
          <DocCoherentReceiverForwardPass
            v-if="activeDocSection === 'coh-recv-forward'"
            @copy="handleCopyCode"
          />

          <!-- IFTS coherent_receiver __naive_pass__ 函数详情页 -->
          <DocCoherentReceiverNaivePass
            v-if="activeDocSection === 'coh-recv-naive'"
            @copy="handleCopyCode"
          />

          <!-- IFTS coherent_receiver __add_noise__ 函数详情页 -->
          <DocCoherentReceiverAddNoise
            v-if="activeDocSection === 'coh-recv-noise'"
            @copy="handleCopyCode"
          />

          <!-- IFTS EDFA 类说明页 -->
          <DocEDFA
            v-if="activeDocSection === 'edfa'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS EDFA __init__ 函数详情页 -->
          <DocEDFAInit
            v-if="activeDocSection === 'edfa-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS EDFA forward_pass 函数详情页 -->
          <DocEDFAForwardPass
            v-if="activeDocSection === 'edfa-forward'"
            @copy="handleCopyCode"
          />

          <!-- IFTS EDFA __naive_pass__ 函数详情页 -->
          <DocEDFANaivePass
            v-if="activeDocSection === 'edfa-naive'"
            @copy="handleCopyCode"
          />

          <!-- IFTS EDFA __no_noise_pass__ 函数详情页 -->
          <DocEDFANoNoisePass
            v-if="activeDocSection === 'edfa-no-noise'"
            @copy="handleCopyCode"
          />

          <!-- IFTS EDFA __calcu_noise_power__ 函数详情页 -->
          <DocEDFACalcuNoisePower
            v-if="activeDocSection === 'edfa-noise-power'"
            @copy="handleCopyCode"
          />

          <!-- IFTS EDFA __amplifier__ 函数详情页 -->
          <DocEDFAAmplifier
            v-if="activeDocSection === 'edfa-amplifier'"
            @copy="handleCopyCode"
          />

          <!-- IFTS EDFA __add_noise__ 函数详情页 -->
          <DocEDFAAddNoise
            v-if="activeDocSection === 'edfa-add-noise'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM Module 模块简介页 -->
          <DocSSFMModule
            v-if="activeDocSection === 'ssfm'"
            @pageNavSelect="handlePageNavSelect"
            @subModuleClick="handleSubModuleClick"
          />

          <!-- IFTS SSFM calculation functions 页面 -->
          <DocSSFMCalculationFunctions
            v-if="activeDocSection === 'ssfm-calc-funcs'"
            @functionClick="handleFunctionClick"
          />

          <!-- IFTS Step_Size 页面 -->
          <DocSSFMStepSize
            v-if="activeDocSection === 'step-size'"
          />

          <!-- IFTS Step_Size __init__ 页面 -->
          <DocSSFMStepSizeInit
            v-if="activeDocSection === 'step-size-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS Step_Size step 页面 -->
          <DocSSFMStepSizeStep
            v-if="activeDocSection === 'step-size-step'"
            @copy="handleCopyCode"
          />

          <!-- IFTS Step_Size __check_step_size__ 页面 -->
          <DocSSFMStepSizeCheck
            v-if="activeDocSection === 'step-size-check'"
            @copy="handleCopyCode"
          />

          <!-- IFTS Step_Size __nonlinear_phase_step__ 页面 -->
          <DocSSFMStepSizeNlPhase
            v-if="activeDocSection === 'step-size-nl-phase'"
            @copy="handleCopyCode"
          />

          <!-- IFTS Step_Size __log_step__ 页面 -->
          <DocSSFMStepSizeLog
            v-if="activeDocSection === 'step-size-log'"
            @copy="handleCopyCode"
          />

          <!-- IFTS Step_Size __np_log_step__ 页面 -->
          <DocSSFMStepSizeNpLog
            v-if="activeDocSection === 'step-size-np-log'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM __init__ 页面 -->
          <DocSSFMInit
            v-if="activeDocSection === 'ssfm-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM init 方法页面 -->
          <DocSSFMInitMethod
            v-if="activeDocSection === 'ssfm-init-fn'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM __pmd_init__ 页面 -->
          <DocSSFMPmdInit
            v-if="activeDocSection === 'ssfm-pmd-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM __step_init__ 页面 -->
          <DocSSFMStepInit
            v-if="activeDocSection === 'ssfm-step-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM __func_para_init__ 页面 -->
          <DocSSFMFuncParaInit
            v-if="activeDocSection === 'ssfm-func-para-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM forward_pass 页面 -->
          <DocSSFMForwardPass
            v-if="activeDocSection === 'ssfm-forward'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM __ssfm_scalar__ 页面 -->
          <DocSSFMSsfmScalar
            v-if="activeDocSection === 'ssfm-scalar'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM __ssfm_matrix__ 页面 -->
          <DocSSFMSsfmMatrix
            v-if="activeDocSection === 'ssfm-matrix'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM __calcu_p__ 页面 -->
          <DocSSFMCalcuP
            v-if="activeDocSection === 'ssfm-calcu-p'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM linearity_scalar 页面 -->
          <DocSSFMLinearityScalar
            v-if="activeDocSection === 'ssfm-linearity-scalar'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM nonlinearity_scalar 页面 -->
          <DocSSFMNonlinearityScalar
            v-if="activeDocSection === 'ssfm-nonlinearity-scalar'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM linearity_matrix 页面 -->
          <DocSSFMLinearityMatrix
            v-if="activeDocSection === 'ssfm-linearity-matrix'"
            @copy="handleCopyCode"
          />

          <!-- IFTS SSFM nonlinearity_matrix 页面 -->
          <DocSSFMNonlinearityMatrix
            v-if="activeDocSection === 'ssfm-nonlinearity-matrix'"
            @copy="handleCopyCode"
          />

          <!-- IFTS WSS 类说明页 -->
          <DocWSS
            v-if="activeDocSection === 'wss'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS WSS __init__ 页面 -->
          <DocWSSInit
            v-if="activeDocSection === 'wss-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS WSS init 页面 -->
          <DocWSSInitFn
            v-if="activeDocSection === 'wss-init-fn'"
            @copy="handleCopyCode"
          />

          <!-- IFTS WSS __filter_in_freq__ 页面 -->
          <DocWSSFilterInFreq
            v-if="activeDocSection === 'wss-filter'"
            @copy="handleCopyCode"
          />

          <!-- IFTS WSS __get_transfer_func__ 页面 -->
          <DocWSSGetTransferFunc
            v-if="activeDocSection === 'wss-transfer'"
            @copy="handleCopyCode"
          />

          <!-- IFTS WSS wdm_multiplexing 页面 -->
          <DocWSSMultiplexing
            v-if="activeDocSection === 'wss-mux'"
            @copy="handleCopyCode"
          />

          <!-- IFTS WSS wdm_demultiplexing 页面 -->
          <DocWSSDemultiplexing
            v-if="activeDocSection === 'wss-demux'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module __init__ 页面 -->
          <DocNNModuleInit
            v-if="activeDocSection === 'nn-module-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module init 页面 -->
          <DocNNModuleInitFn
            v-if="activeDocSection === 'nn-init-fn'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module __nn_model_init__ 页面 -->
          <DocNNModuleModelInit
            v-if="activeDocSection === 'nn-model-init'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module forward_pass 页面 -->
          <DocNNModuleForward
            v-if="activeDocSection === 'nn-forward'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module __nn_matrix__ 页面 -->
          <DocNNModuleMatrix
            v-if="activeDocSection === 'nn-matrix'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module __data_process__ 页面 -->
          <DocNNModuleDataProcess
            v-if="activeDocSection === 'nn-data'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module __sliding_window__ 页面 -->
          <DocNNModuleSlidingWindow
            v-if="activeDocSection === 'nn-window'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module __real_to_com__ 页面 -->
          <DocNNModuleRealToCom
            v-if="activeDocSection === 'nn-real'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module __com_to_real__ 页面 -->
          <DocNNModuleComToReal
            v-if="activeDocSection === 'nn-com'"
            @copy="handleCopyCode"
          />

          <!-- IFTS Transmitter 模块概览页 -->
          <DocTransmitter
            v-if="activeDocSection === 'transmitter'"
            @pageNavSelect="handlePageNavSelect"
            @subModuleClick="handleSubModuleClick"
          />

          <!-- IFTS Transmitter shaping 函数详情页 -->
          <DocTransmitterShaping
            v-if="activeDocSection === 'shaping'"
            @copy="handleCopyCode"
          />

          <!-- IFTS NN Module 类说明页 -->
          <DocNNModule
            v-if="activeDocSection === 'nn-module'"
            @pageNavSelect="handlePageNavSelect"
            @functionClick="handleFunctionClick"
          />

          <!-- IFTS data_gen 页面 -->
          <DocDataGen
            v-if="activeDocSection === 'data-gen'"
            @pageNavSelect="handlePageNavSelect"
            @functionClick="handleFunctionClick"
          />

          <!-- IFTS rng_gen 函数详情页 -->
          <DocRngGen
            v-if="activeDocSection === 'rng-gen'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS sym_gen 函数详情页 -->
          <DocSymGen
            v-if="activeDocSection === 'sym-gen'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS modulation 页面 -->
          <DocModulation
            v-if="activeDocSection === 'modulation'"
            @pageNavSelect="handlePageNavSelect"
            @functionClick="handleFunctionClick"
          />

          <!-- IFTS nn 函数详情页 -->
          <DocNn
            v-if="activeDocSection === 'nn'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS pam 函数详情页 -->
          <DocPam
            v-if="activeDocSection === 'pam'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS qam 函数详情页 -->
          <DocQam
            v-if="activeDocSection === 'qam'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS demod_design 页面 -->
          <DocDemodDesign
            v-if="activeDocSection === 'demod-design'"
            @pageNavSelect="handlePageNavSelect"
          />

          <!-- IFTS constellations 页面 -->
          <DocConstellations
            v-if="activeDocSection === 'constellations'"
            @pageNavSelect="handlePageNavSelect"
            @functionClick="handleFunctionClick"
          />

          <!-- IFTS qammap 函数详情页 -->
          <DocQammap
            v-if="activeDocSection === 'qammap'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS gs_qammap 函数详情页 -->
          <DocGsQammap
            v-if="activeDocSection === 'gs-qammap'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS perf_calculation 页面 -->
          <DocPerfCalculation
            v-if="activeDocSection === 'perf-calculation'"
            @pageNavSelect="handlePageNavSelect"
            @functionClick="handleFunctionClick"
          />

          <!-- IFTS ber 函数详情页 -->
          <DocBer
            v-if="activeDocSection === 'ber'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS mi 函数详情页 -->
          <DocMi
            v-if="activeDocSection === 'mi'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS gmi 函数详情页 -->
          <DocGmi
            v-if="activeDocSection === 'gmi'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS q_factor 函数详情页 -->
          <DocQFactor
            v-if="activeDocSection === 'q-factor'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS ser 函数详情页 -->
          <DocSer
            v-if="activeDocSection === 'ser'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />

          <!-- IFTS ber_awgn 函数详情页 -->
          <DocBerAwgn
            v-if="activeDocSection === 'ber-awgn'"
            @pageNavSelect="handlePageNavSelect"
            @copyCode="handleCopyCode"
          />
        </template>

        <!-- 帮助内容 -->
        <template v-else-if="activeTab === '帮助'">
          <div class="help-page">
            <div class="breadcrumb">
              <span>首页</span>
              <span class="separator">/</span>
              <span>资源</span>
              <span class="separator">/</span>
              <span class="current">帮助</span>
            </div>
            <h1 class="page-title">帮助中心</h1>
            <p class="intro-text">欢迎使用帮助中心，您可以在这里找到常见问题的解答。</p>
            <hr class="divider" />
            <div class="help-sections">
              <div class="help-section">
                <h2 class="section-title">常见问题</h2>
                <div class="faq-list">
                  <div class="faq-item">
                    <div class="faq-question">如何申请下载模型权重？</div>
                    <div class="faq-answer">点击"申请下载"按钮，填写相关信息后我们的团队会与您联系。</div>
                  </div>
                  <div class="faq-item">
                    <div class="faq-question">OpticsGPT 支持哪些平台？</div>
                    <div class="faq-answer">OpticsGPT 支持 Windows、Linux 和 macOS 系统。</div>
                  </div>
                  <div class="faq-item">
                    <div class="faq-question">如何获取技术支持和帮助？</div>
                    <div class="faq-answer">您可以通过邮件或在线客服联系我们获取技术支持。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 右侧边栏 -->
      <aside class="right-sidebar">
        <!-- 搜索框 -->
        <div class="search-box">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            v-model="searchKeyword"
            type="text"
            class="search-input"
            placeholder="想要查找什么？"
          />
        </div>

        <!-- 页面目录 (文档模式下显示) -->
        <div v-if="activeTab === '文档'" class="toc-nav">
          <div class="toc-header">页面目录</div>
          <div class="toc-list">
            <div class="toc-item toc-item-active">文档说明</div>
            <div class="toc-item">Optics GPT 使用教程</div>
          </div>
        </div>
      </aside>
    </div>

    <!-- 页脚区域 -->
    <footer class="page-footer">
      <div class="footer-container">
        <div class="footer-left">
          <svg class="footer-logo" width="205" height="68" viewBox="0 0 112 37" fill="none">
            <polygon points="6,0 28,0 28,26" fill="#0073FF" />
            <polygon points="0,17 22,17 22,37" fill="#0073FF" />
            <rect x="42" y="4" width="4" height="30" fill="#0073FF"/>
            <rect x="52" y="12" width="4" height="22" fill="#0073FF"/>
            <rect x="62" y="8" width="4" height="26" fill="#0073FF"/>
            <rect x="72" y="15" width="4" height="18" fill="#0073FF"/>
            <rect x="82" y="6" width="4" height="28" fill="#0073FF"/>
            <rect x="92" y="11" width="4" height="23" fill="#0073FF"/>
          </svg>
          <div class="contact-info">
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#020952" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>商务合作请联系：business@infra.com</span>
            </div>
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#020952" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>招聘咨询请联系：hr@infra.com</span>
            </div>
          </div>
          <div class="qr-code"></div>
        </div>
        <div class="footer-right">
          <div class="footer-column">
            <h4 class="column-title">产品</h4>
            <a href="/products/opticsgpt" class="column-link">OpticsGPT</a>
            <a href="/products/ifts" class="column-link">智能仿真工具</a>
            <a href="/products/instruments" class="column-link">智能仪器仪表</a>
          </div>
          <div class="footer-column">
            <h4 class="column-title">新闻中心</h4>
            <a href="/news" class="column-link">新闻动态</a>
            <a href="/research" class="column-link">前沿研究</a>
          </div>
          <div class="footer-column">
            <h4 class="column-title">关于LightInfra</h4>
          </div>
          <div class="footer-column">
            <h4 class="column-title">联系我们</h4>
            <a href="/contact" class="column-link">联系方式</a>
            <a href="/join" class="column-link">加入我们</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import IFTSDocPage from '../components/IFTSDocPage.vue'
import DocBaseModule from '../components/DocBaseModule.vue'
import DocOpticsGPT from '../components/DocOpticsGPT.vue'
import DocBaseDsp from '../components/DocBaseDsp.vue'
import DocBaseOptics from '../components/DocBaseOptics.vue'
import DocBasePara from '../components/DocBasePara.vue'
import DocSignal from '../components/DocSignal.vue'
import DocDataGen from '../components/DocDataGen.vue'
import DocModulation from '../components/DocModulation.vue'
import DocDemodDesign from '../components/DocDemodDesign.vue'
import DocConstellations from '../components/DocConstellations.vue'
import DocPerfCalculation from '../components/DocPerfCalculation.vue'
import DocRngGen from '../components/DocRngGen.vue'
import DocSymGen from '../components/DocSymGen.vue'
import DocNn from '../components/DocNn.vue'
import DocPam from '../components/DocPam.vue'
import DocQam from '../components/DocQam.vue'
import DocQammap from '../components/DocQammap.vue'
import DocGsQammap from '../components/DocGsQammap.vue'
import DocBer from '../components/DocBer.vue'
import DocMi from '../components/DocMi.vue'
import DocGmi from '../components/DocGmi.vue'
import DocQFactor from '../components/DocQFactor.vue'
import DocSer from '../components/DocSer.vue'
import DocBerAwgn from '../components/DocBerAwgn.vue'
import DocChannel from '../components/DocChannel.vue'
import DocChannelPara from '../components/DocChannelPara.vue'
import DocCoherentReceiver from '../components/DocCoherentReceiver.vue'
import DocEDFA from '../components/DocEDFA.vue'
import DocSSFMModule from '../components/DocSSFMModule.vue'
import DocSSFMCalculationFunctions from '../components/DocSSFMCalculationFunctions.vue'
import DocSSFMStepSize from '../components/DocSSFMStepSize.vue'
import DocSSFMInit from '../components/DocSSFMInit.vue'
import DocSSFMInitMethod from '../components/DocSSFMInitMethod.vue'
import DocSSFMPmdInit from '../components/DocSSFMPmdInit.vue'
import DocSSFMStepInit from '../components/DocSSFMStepInit.vue'
import DocSSFMFuncParaInit from '../components/DocSSFMFuncParaInit.vue'
import DocSSFMForwardPass from '../components/DocSSFMForwardPass.vue'
import DocSSFMSsfmScalar from '../components/DocSSFMSsfmScalar.vue'
import DocSSFMSsfmMatrix from '../components/DocSSFMSsfmMatrix.vue'
import DocSSFMCalcuP from '../components/DocSSFMCalcuP.vue'
import DocSSFMLinearityScalar from '../components/DocSSFMLinearityScalar.vue'
import DocSSFMNonlinearityScalar from '../components/DocSSFMNonlinearityScalar.vue'
import DocSSFMLinearityMatrix from '../components/DocSSFMLinearityMatrix.vue'
import DocSSFMNonlinearityMatrix from '../components/DocSSFMNonlinearityMatrix.vue'
import DocSSFMStepSizeInit from '../components/DocSSFMStepSizeInit.vue'
import DocSSFMStepSizeStep from '../components/DocSSFMStepSizeStep.vue'
import DocSSFMStepSizeCheck from '../components/DocSSFMStepSizeCheck.vue'
import DocSSFMStepSizeNlPhase from '../components/DocSSFMStepSizeNlPhase.vue'
import DocSSFMStepSizeLog from '../components/DocSSFMStepSizeLog.vue'
import DocSSFMStepSizeNpLog from '../components/DocSSFMStepSizeNpLog.vue'
import DocWSS from '../components/DocWSS.vue'
import DocWSSInit from '../components/DocWSSInit.vue'
import DocWSSInitFn from '../components/DocWSSInitFn.vue'
import DocWSSFilterInFreq from '../components/DocWSSFilterInFreq.vue'
import DocWSSGetTransferFunc from '../components/DocWSSGetTransferFunc.vue'
import DocWSSMultiplexing from '../components/DocWSSMultiplexing.vue'
import DocWSSDemultiplexing from '../components/DocWSSDemultiplexing.vue'
import DocNNModule from '../components/DocNNModule.vue'
import DocNNModuleInit from '../components/DocNNModuleInit.vue'
import DocNNModuleInitFn from '../components/DocNNModuleInitFn.vue'
import DocNNModuleModelInit from '../components/DocNNModuleModelInit.vue'
import DocNNModuleForward from '../components/DocNNModuleForward.vue'
import DocNNModuleMatrix from '../components/DocNNModuleMatrix.vue'
import DocNNModuleDataProcess from '../components/DocNNModuleDataProcess.vue'
import DocNNModuleSlidingWindow from '../components/DocNNModuleSlidingWindow.vue'
import DocNNModuleRealToCom from '../components/DocNNModuleRealToCom.vue'
import DocNNModuleComToReal from '../components/DocNNModuleComToReal.vue'
import DocTransmitter from '../components/DocTransmitter.vue'
import DocTransmitterShaping from '../components/DocTransmitterShaping.vue'
import DocChannelParaInit from '../components/DocChannelParaInit.vue'
import DocChannelParaTransmitterPara from '../components/DocChannelParaTransmitterPara.vue'
import DocChannelParaWssPara from '../components/DocChannelParaWssPara.vue'
import DocChannelParaEdfaPara from '../components/DocChannelParaEdfaPara.vue'
import DocChannelParaReceiverPara from '../components/DocChannelParaReceiverPara.vue'
import DocChannelParaFiberPara from '../components/DocChannelParaFiberPara.vue'
import DocCoherentReceiverInit from '../components/DocCoherentReceiverInit.vue'
import DocCoherentReceiverInitMethod from '../components/DocCoherentReceiverInitMethod.vue'
import DocCoherentReceiverForwardPass from '../components/DocCoherentReceiverForwardPass.vue'
import DocCoherentReceiverNaivePass from '../components/DocCoherentReceiverNaivePass.vue'
import DocCoherentReceiverAddNoise from '../components/DocCoherentReceiverAddNoise.vue'
import DocEDFAInit from '../components/DocEDFAInit.vue'
import DocEDFAForwardPass from '../components/DocEDFAForwardPass.vue'
import DocEDFANaivePass from '../components/DocEDFANaivePass.vue'
import DocEDFANoNoisePass from '../components/DocEDFANoNoisePass.vue'
import DocEDFACalcuNoisePower from '../components/DocEDFACalcuNoisePower.vue'
import DocEDFAAmplifier from '../components/DocEDFAAmplifier.vue'
import DocEDFAAddNoise from '../components/DocEDFAAddNoise.vue'

defineProps({
  activeProduct: {
    type: String,
    default: 'OpticsGPT'
  }
})

const emit = defineEmits([
  'update:activeProduct',
  'update:activeTab',
  'download',
  'search',
  'version-change'
])

const tabs = ['下载', '文档', '帮助']

// 本地状态管理
const activeTab = ref('下载')
const activeProduct = ref('OpticsGPT')
const activeDocSection = ref('')
const searchKeyword = ref('')

const handleTabChange = (tab) => {
  activeTab.value = tab
  if (tab === '文档') {
    activeProduct.value = 'OpticsGPT'
    activeDocSection.value = 'opticsgpt-manual'
  }
  emit('update:activeTab', tab)
}

const handleProductChange = (product) => {
  activeProduct.value = product
  emit('update:activeProduct', product)
}

const handleDocNavClick = (product, section = 'code-docs') => {
  activeProduct.value = product
  activeDocSection.value = section
  emit('update:activeProduct', product)
}

const handleMenuSelect = ({ product, section }) => {
  activeProduct.value = product
  activeDocSection.value = section
  emit('update:activeProduct', product)
}

const handlePageNavSelect = ({ id }) => {
  console.log('Page nav selected:', id)
}

const handleFunctionClick = (functionName) => {
  console.log('Function clicked:', functionName)
}

const handleSubModuleClick = (moduleName) => {
  // 跳转到对应的子模块页面
  if (moduleName === 'base_dsp') {
    activeDocSection.value = 'base-dsp'
  } else if (moduleName === 'base_optics') {
    activeDocSection.value = 'base-optics'
  } else if (moduleName === 'base_para') {
    activeDocSection.value = 'base-para'
  } else if (moduleName === 'data_gen') {
    activeDocSection.value = 'data-gen'
  } else if (moduleName === 'modulation') {
    activeDocSection.value = 'modulation'
  } else if (moduleName === 'demod_design') {
    activeDocSection.value = 'demod-design'
  } else if (moduleName === 'constellations') {
    activeDocSection.value = 'constellations'
  } else if (moduleName === 'perf_calculation') {
    activeDocSection.value = 'perf-calculation'
  } else if (moduleName === 'data_gen') {
    activeDocSection.value = 'data-gen'
  } else if (moduleName === 'rng_gen') {
    activeDocSection.value = 'rng-gen'
  } else if (moduleName === 'sym_gen') {
    activeDocSection.value = 'sym-gen'
  } else if (moduleName === 'nn') {
    activeDocSection.value = 'nn'
  } else if (moduleName === 'pam') {
    activeDocSection.value = 'pam'
  } else if (moduleName === 'qam') {
    activeDocSection.value = 'qam'
  } else if (moduleName === 'qammap') {
    activeDocSection.value = 'qammap'
  } else if (moduleName === 'gs_qammap') {
    activeDocSection.value = 'gs-qammap'
  } else if (moduleName === 'ber') {
    activeDocSection.value = 'ber'
  } else if (moduleName === 'mi') {
    activeDocSection.value = 'mi'
  } else if (moduleName === 'gmi') {
    activeDocSection.value = 'gmi'
  } else if (moduleName === 'q_factor') {
    activeDocSection.value = 'q-factor'
  } else if (moduleName === 'ser') {
    activeDocSection.value = 'ser'
  } else if (moduleName === 'ber_awgn') {
    activeDocSection.value = 'ber-awgn'
  } else if (moduleName === 'channel_para') {
    activeDocSection.value = 'channel-para'
  } else if (moduleName === 'coherent_receiver') {
    activeDocSection.value = 'coherent-receiver'
  } else if (moduleName === 'EDFA') {
    activeDocSection.value = 'edfa'
  } else if (moduleName === 'SSFM Module') {
    activeDocSection.value = 'ssfm-module'
  } else if (moduleName === 'WSS') {
    activeDocSection.value = 'wss'
  } else if (moduleName === 'NN Module') {
    activeDocSection.value = 'nn-module'
  } else if (moduleName === 'SSFM') {
    activeDocSection.value = 'ssfm'
  } else if (moduleName === 'SSFM calculation functions') {
    activeDocSection.value = 'ssfm-calc-funcs'
  } else if (moduleName === 'Step_Size') {
    activeDocSection.value = 'step-size'
  } else if (moduleName === 'WSS') {
    activeDocSection.value = 'wss'
  } else if (moduleName === 'get_transfer_func') {
    activeDocSection.value = 'wss-transfer'
  } else if (moduleName === 'filter_in_freq') {
    activeDocSection.value = 'wss-filter'
  } else if (moduleName === 'wdm_multiplexing') {
    activeDocSection.value = 'wss-mux'
  } else if (moduleName === 'wdm_demultiplexing') {
    activeDocSection.value = 'wss-demux'
  } else if (moduleName === 'NN Module') {
    activeDocSection.value = 'nn-module'
  } else if (moduleName === '__init__') {
    // Check if we're in NN Module context - this could be nn-init
    activeDocSection.value = 'nn-init'
  } else if (moduleName === 'init') {
    activeDocSection.value = 'nn-init-fn'
  } else if (moduleName === '__nn_model_init__') {
    activeDocSection.value = 'nn-model-init'
  } else if (moduleName === 'forward_pass') {
    activeDocSection.value = 'nn-forward'
  } else if (moduleName === '__nn_matrix__') {
    activeDocSection.value = 'nn-matrix'
  } else if (moduleName === '__trans_nn_matrix__') {
    activeDocSection.value = 'nn-trans'
  } else if (moduleName === '__data_process__') {
    activeDocSection.value = 'nn-data'
  } else if (moduleName === '__sliding_window__') {
    activeDocSection.value = 'nn-window'
  } else if (moduleName === '__real_to_com__') {
    activeDocSection.value = 'nn-real'
  } else if (moduleName === '__com_to_real__') {
    activeDocSection.value = 'nn-com'
  } else if (moduleName === 'shaping') {
    activeDocSection.value = 'shaping'
  }
}

const handleCopyCode = (code) => {
  console.log('Code copied:', code)
  emit('search', code)
}
</script>

<style scoped>
/* ========== 页面整体布局 ========== */
.resource-page {
  width: 1440px;
  min-height: 1297px;
  margin: 0 auto;
  background: #FFFFFF;
  font-family: system-ui, -apple-system, sans-serif;
}

/* ========== 顶部导航栏背景 ========== */
.navbar-bg {
  background: #121212;
  position: sticky;
  top: 0;
  z-index: 99;
}

/* ========== 主内容区域 ========== */
.main-content {
  display: flex;
  padding: 0 calc((1440px - 1200px) / 2);
  padding-top: 120px;
  justify-content: space-between;
}

/* ========== 左侧产品导航栏 ========== */
.product-nav {
  width: 282px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* aside 内标签样式 */
.aside-tabs {
  display: flex;
  gap: 32px;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #EEEEEE;
}

.aside-tab-item {
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #BBBBBB;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.aside-tab-item:hover {
  color: #121212;
}

.aside-tab-active {
  color: #121212;
}

/* ========== 导航内容区 ========== */
.nav-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
}

.nav-section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #8E96A6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-section-header svg {
  color: #8E96A6;
}

/* 产品导航样式 */
.product-nav-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 2px;
  width: 282px;
}

.product-nav-item {
  display: flex;
  align-items: center;
  padding: 4px 20px;
  width: 282px;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  color: #8E96A6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-nav-item:hover {
  color: #121212;
}

.product-nav-active {
  color: #121212;
  background: transparent;
}

.product-nav-sub-item {
  padding: 4px 20px 4px 36px;
  font-size: 14px;
  font-weight: 400;
  color: #8E96A6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-nav-sub-item:hover {
  color: #121212;
}

.product-nav-sub-active {
  color: #121212;
}

.product-nav-level-active {
  color: #0073FF;
  font-weight: 600;
}

.product-nav-level2 {
  padding-left: 28px;
}

.product-nav-level3 {
  padding-left: 32px;
}

.product-nav-level4 {
  padding-left: 60px;
}

.product-nav-level5 {
  padding-left: 76px;
}

.product-nav-level5-68 {
  padding-left: 68px;
}

.product-nav-level6 {
  padding-left: 92px;
}

.product-nav-level7 {
  padding-left: 108px;
}

.product-nav-sub-children {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-nav-sub-child {
  padding-left: 52px;
}

.product-nav-sub-children-level2 {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-nav-sub-child-level2 {
  padding-left: 68px;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.arrow-rotated {
  transform: rotate(180deg);
}

/* ========== 中间内容区 ========== */
.content-middle {
  flex: 1;
  max-width: 815px;
}

/* ========== 右侧边栏 ========== */
.right-sidebar {
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 0;
}

/* 搜索框 */
.search-box {
  width: 230px;
  height: 40px;
  border: 1px solid #BBBBBB;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  transition: border-color 0.2s ease;
}

.search-box:focus-within {
  border-color: #0073FF;
}

.search-icon {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #121212;
}

.search-input::placeholder {
  color: #BBBBBB;
}

/* 页面目录 */
.toc-nav {
  padding-left: 12px;
  border-left: 1px solid #E2E7EF;
}

.toc-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 14px;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toc-item {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
}

.toc-item:hover {
  color: #0073FF;
}

.toc-item-active {
  color: #0073FF;
  font-weight: 600;
}

/* ========== 面包屑导航 ========== */
.breadcrumb {
  font-size: 12px;
  font-weight: 400;
  color: #8E96A6;
  line-height: 20px;
}

.breadcrumb .separator {
  margin: 0 8px;
}

.breadcrumb .current {
  color: #121212;
}

/* ========== 版本选择器 ========== */
.top-bar {
  display: flex;
  align-items: center;
  padding-top: 20px;
}

.version-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.version-text {
  font-size: 28px;
  font-weight: 600;
  color: #121212;
  line-height: 36px;
}

/* ========== 资源卡片区域 ========== */
.resource-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
}

.resource-card {
  background: #FFFFFF;
  border: 1px solid #E2E7EF;
  border-radius: 12px;
  padding: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #121212;
  margin: 0 0 8px 0;
}

.card-desc {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0 0 16px 0;
}

.download-btn {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #121212;
  background: transparent;
  border: 1px solid #121212;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.download-btn:hover {
  color: #0073FF;
  border-color: #0073FF;
}

/* ========== 帮助页面样式 ========== */
.help-page {
  padding-bottom: 80px;
}

.help-page .page-title {
  font-size: 28px;
  font-weight: 600;
  color: #121212;
  line-height: 36px;
  margin-top: 14px;
}

.help-page .intro-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 12px;
}

.help-page .divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
  border: none;
  margin-top: 20px;
}

.help-sections {
  margin-top: 36px;
}

.help-section .section-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
  margin: 0 0 20px 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: #F8FAFD;
  border: 1px solid #E2E7EF;
  border-radius: 12px;
  padding: 16px 20px;
}

.faq-question {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 8px;
}

.faq-answer {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
}

/* ========== 页脚区域 ========== */
.page-footer {
  width: 1440px;
  background: #FFFFFF;
  border-top: 1px solid #EEEEEE;
  margin-top: 80px;
}

.footer-container {
  width: 1200px;
  margin: 0 auto;
  padding: 80px 0;
  display: flex;
  gap: 77px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-logo {
  display: block;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #020952;
}

.qr-code {
  width: 128px;
  height: 128px;
  background: #D9D9D9;
  border-radius: 20px;
}

.footer-right {
  flex: 1;
  display: flex;
  gap: 77px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column-title {
  font-size: 20px;
  font-weight: 600;
  color: #0F0F0F;
  margin: 0;
}

.column-link {
  font-size: 14px;
  color: #515151;
  text-decoration: none;
  transition: color 0.2s ease;
}

.column-link:hover {
  color: #0073FF;
}
</style>
