import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import styles from "./worldHeatMap.module.scss";
import { tldCountryMap } from "../../utils/tldCountryMap";

const WorldHeatMap = ({ rawData }) => {
  const svgRef = useRef();

  // Preprocess data
  const tldUsageData = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];

    const total = rawData.reduce((sum, d) => sum + d.count, 0);
    const maxCount = Math.max(...rawData.map(d => d.count));

    return rawData
      .filter(d => tldCountryMap[d.tld]) // only keep mapped TLDs
      .map(d => {
        const { lon, lat, chip } = tldCountryMap[d.tld];
        return {
          tld: d.tld,
          pct: `${((d.count / total) * 100).toFixed(1)}%`,
          weight: d.count / maxCount,
          lon,
          lat,
          chip
        };
      });
  }, [rawData]);

  useEffect(() => {
    if (tldUsageData.length === 0) return;

    const w = 1200;
    const h = 650;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const g = svg.append("g");

    const projection = d3.geoMercator()
      .translate([w / 2, h / 1.55])
      .scale(190);

    const path = d3.geoPath(projection);

    const worldUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

    d3.json(worldUrl).then(world => {
      const countries = topojson.feature(world, world.objects.countries).features;

      // Draw land
      g.append("g")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("fill", "#0f172a")
        .attr("stroke", "#1f2a44")
        .attr("stroke-width", 0.6);

      // Ocean background
      const defs = svg.append("defs");
      const oceanGrad = defs.append("radialGradient")
        .attr("id", "oceanGrad")
        .attr("cx", "50%")
        .attr("cy", "45%");
      oceanGrad.append("stop").attr("offset", "0%").attr("stop-color", "#0e1626");
      oceanGrad.append("stop").attr("offset", "100%").attr("stop-color", "#0e1420");
      g.append("rect")
        .attr("width", w).attr("height", h)
        .attr("fill", "url(#oceanGrad)")
        .lower();

      // Heat color scale
      const heat = d3.scaleLinear()
        .domain([0, 0.25, 0.5, 0.75, 1])
        .range(["#38bdf8", "#22d3ee", "#facc15", "#fb923c", "#ef4444"]);

      // Heat spots
      tldUsageData.forEach(d => {
        const [x, y] = projection([d.lon, d.lat]);
        g.append("circle")
          .attr("cx", x).attr("cy", y)
          .attr("r", 120 + 220 * d.weight)
          .attr("fill", heat(d.weight))
          .attr("opacity", 0.18)
          .style("filter", "blur(28px)");

        g.append("circle")
          .attr("cx", x).attr("cy", y)
          .attr("r", 40 + 90 * d.weight)
          .attr("fill", heat(d.weight))
          .attr("opacity", 0.35)
          .style("filter", "blur(10px)");
      });

      // Chips
      const chips = svg.append("g");
      tldUsageData.forEach(d => {
        const chip = chips.append("foreignObject")
          .attr("x", d.chip.x - 70)
          .attr("y", d.chip.y - 34)
          .attr("width", 160)
          .attr("height", 70);
        const div = chip.append("xhtml:div")
          .attr("class", styles.chip);
        div.html(`
          <div class="${styles.tld}">${d.tld}</div>
          <div class="${styles.pct}">${d.pct}</div>
        `);
      });
    });
  }, [tldUsageData]);

  return (
    <div style={{ width: "100%" }}>
      <svg ref={svgRef} viewBox="0 0 1200 650"
        style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
      <div className={styles.legendWrap}>
        <span className={styles.legendLabel}>Lower</span>
        <div className={styles.legend}></div>
        <span className={styles.legendLabel}>Higher</span>
      </div>
    </div>
  );
};

export default WorldHeatMap;
