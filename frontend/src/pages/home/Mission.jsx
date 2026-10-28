// src/components/sections/Mission.jsx
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Button } from '@/components/common/Button';
import { RegisterButton } from '@/components/common/RegisterButton';
import styles from './Mission.module.css';

// Modular Data Configuration
const MISSION_DATA_CONFIG = {
  overallMission: {
    title: '1M Impact Progress',
    achieved: 25000,
    remainingTarget: 975000,
    totalTarget: 1000000,
    percentage: 2.5,
  },
  annual2026: {
    title: '2026 Impact Progress',
    currentActual: 18500,
    targetGoal: 25000,
    percentageAchieved: 74,
  },
  roadmap: {
    title: 'Impact Roadmap (2026–2036)',
    milestones: [
      { year: '2026', target: 25000, label: '25K Target' },
      { year: '2028', target: 150000, label: '150K Target' },
      { year: '2031', target: 500000, label: '500K Target' },
      { year: '2036', target: 1000000, label: '1M Target' },
    ],
  },
};

// Colors
const COLOR_GREEN = '#10B981';
const COLOR_YELLOW = '#FCC55F';

// Synchronized Framer Motion Spring Variant Configs
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
  hover: {
    scale: 1.015,
    borderColor: '#FCC55F',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <AnimatePresence>
        <motion.div
          className={styles.chartTooltip}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.15 }}
        >
          <p className={styles.tooltipName}>{data.name || data.payload.year}</p>
          <p className={styles.tooltipValue}>
            {typeof data.value === 'number'
              ? data.value.toLocaleString() + ' Youth'
              : data.value}
          </p>
        </motion.div>
      </AnimatePresence>
    );
  }
  return null;
};

export function Mission() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Three.js Background Sparkle Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xfcc55f,
      transparent: true,
      opacity: 0.5,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationFrameId;
    const animateScene = () => {
      animationFrameId = requestAnimationFrame(animateScene);
      particles.rotation.y += 0.0007;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animateScene();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Datasets
  const pieData = [
    {
      name: 'Youth Trained So Far',
      value: MISSION_DATA_CONFIG.overallMission.achieved,
    },
    {
      name: 'Remaining Target Goal',
      value: MISSION_DATA_CONFIG.overallMission.remainingTarget,
    },
  ];

  const annualBarData = [
    {
      name: '2026 Target',
      actual: MISSION_DATA_CONFIG.annual2026.currentActual,
      remaining:
        MISSION_DATA_CONFIG.annual2026.targetGoal -
        MISSION_DATA_CONFIG.annual2026.currentActual,
    },
  ];

  const roadmapBarData = MISSION_DATA_CONFIG.roadmap.milestones.map((m) => ({
    year: m.year,
    Target: m.target,
    label: m.label,
  }));

  return (
    <section className={styles.sectionContainer}>
      {/* Three.js Background Canvas */}
      <canvas ref={canvasRef} className={styles.threeCanvas} />

      <div className={styles.innerContainer}>
        {/* Top Header Section */}
        <div className={styles.topHeader}>
          <h2 className={styles.missionHeading}>
            1 MILLION YOUTHS IMPACTED BY 2036
          </h2>
          <div className={styles.textDivider} />
        </div>

        {/* Main Grid Section */}
        <div className={styles.mainGrid}>
          {/* LEFT COLUMN: 1M Donut Chart Card */}
          <motion.div
            className={styles.chartCardLeft}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className={styles.cardTitleCentered}>
              {MISSION_DATA_CONFIG.overallMission.title}
            </h3>

            <div className={styles.donutWrapper}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={95}
                    outerRadius={135}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="#0D0460"
                    strokeWidth={3}
                    isAnimationActive={true}
                  >
                    <Cell key="cell-0" fill={COLOR_GREEN} />
                    <Cell key="cell-1" fill={COLOR_YELLOW} />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Overlay Text inside Donut Hole */}
              <div className={styles.donutHoleContent}>
                <span className={styles.donutHolePercent}>
                  {MISSION_DATA_CONFIG.overallMission.percentage}%
                </span>
                <span className={styles.donutHoleLabel}>Overall Progress</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className={styles.legendContainer}>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendBox}
                  style={{ backgroundColor: COLOR_GREEN }}
                />
                <span className={styles.legendText}>
                  Trained So Far: {MISSION_DATA_CONFIG.overallMission.achieved.toLocaleString()}
                </span>
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendBox}
                  style={{ backgroundColor: COLOR_YELLOW }}
                />
                <span className={styles.legendText}>
                  Total Target: {MISSION_DATA_CONFIG.overallMission.totalTarget.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Stacked Cards (30% Progress / 70% Roadmap) */}
          <div className={styles.rightColumnStack}>
            {/* 1. 2026 Impact Progress Card (30% Height Allocation) */}
            <motion.div
              className={styles.progressCardCompact}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className={styles.cardHeaderRow}>
                <h3 className={styles.cardTitle}>
                  {MISSION_DATA_CONFIG.annual2026.title}
                </h3>
                <span className={styles.cardBadge}>
                  {MISSION_DATA_CONFIG.annual2026.percentageAchieved}% Reached
                </span>
              </div>

              <div className={styles.barChartWrapper}>
                <ResponsiveContainer width="100%" height={45}>
                  <BarChart
                    layout="vertical"
                    data={annualBarData}
                    margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="actual"
                      stackId="a"
                      fill={COLOR_GREEN}
                      barSize={20}
                      isAnimationActive={true}
                    />
                    <Bar
                      dataKey="remaining"
                      stackId="a"
                      fill={COLOR_YELLOW}
                      barSize={20}
                      isAnimationActive={true}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Legend Below */}
              <div className={styles.legendContainerCompact}>
                <div className={styles.legendItem}>
                  <span
                    className={styles.legendBox}
                    style={{ backgroundColor: COLOR_GREEN }}
                  />
                  <span className={styles.legendText}>
                    Actual: {MISSION_DATA_CONFIG.annual2026.currentActual.toLocaleString()}
                  </span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={styles.legendBox}
                    style={{ backgroundColor: COLOR_YELLOW }}
                  />
                  <span className={styles.legendText}>
                    Target: {MISSION_DATA_CONFIG.annual2026.targetGoal.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2. Impact Roadmap Card (70% Height Allocation) */}
            <motion.div
              className={styles.roadmapCardProportional}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h3 className={styles.cardTitle}>
                {MISSION_DATA_CONFIG.roadmap.title}
              </h3>

              <div className={styles.barChartWrapperFlex}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={roadmapBarData}
                    margin={{ top: 15, right: 10, left: -15, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="year"
                      stroke="#D3CEFD"
                      tickLine={false}
                      style={{ fontSize: '0.85rem', fontWeight: 'bold' }}
                    />
                    <YAxis
                      stroke="#D3CEFD"
                      tickLine={false}
                      style={{ fontSize: '0.8rem' }}
                      tickFormatter={(val) => `${val / 1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="Target"
                      fill={COLOR_YELLOW}
                      barSize={24}
                      isAnimationActive={true}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section Report Info & Dual Action Buttons */}
        <div className={styles.reportInfoWrapper}>
          <div className={styles.ctaDivider} />
          <p className={styles.taglineText}>
            Young people trained so far across technical courses, integrated
            career programs, and community workshops, measured against our
            projected impact goals.
          </p>
          <div className={styles.reportButtonGroup}>
            <Button
              variant="outline"
              light={true}
              size="lg"
              onClick={() => navigate('/media/reports')}
            >
              See Full Report
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Support This Mission
            </Button>
          </div>
        </div>
      </div>

      {/* FULL-BLEED ORANGE CTA BANNER */}
      <div className={styles.orangeCtaBanner}>
        <div className={styles.ctaInnerWrapper}>
          <div className={styles.ctaLeftContent}>
            <h3 className={styles.ctaHeading}>
              Be one of the million. Start with the January 2027 intake.
            </h3>
          </div>
          <div className={styles.ctaRightButtons}>
            <RegisterButton
              variant="primary"
              size="lg"
              className={styles.ctaPrimaryBtn}
            >
              REGISTER ONLINE
            </RegisterButton>
            <Button
              variant="outline"
              size="lg"
              className={styles.ctaOutlineBtn}
              onClick={() => navigate('/academic/courses')}
            >
              EXPLORE COURSES
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission;