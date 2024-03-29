import React, { useState } from 'react';
import { TradingViewEmbed, widgetType, AdvancedChart } from "react-tradingview-embed";

function Graph({coin}) {

  return (
    <div className="flex">
      <div id="tradingview_cee6e" style={{height: 550, width: 550}}></div>
          <AdvancedChart
            widgetProps={{
              "autosize": true,
              "symbol": coin + "USD",
              "interval": "D",
              "timezone": "Etc/UTC",
              "theme": "dark",
              "style": "1",
              "locale": "en",
              "toolbar_bg": "#f1f3f6",
              "enable_publishing": false,
              "withdateranges": true,
              "hide_side_toolbar": false,
              "allow_symbol_change": true,
              "container_id": "tradingview_cee6e"
            }}
          />
    </div>
  )

}

export default React.memo(Graph);