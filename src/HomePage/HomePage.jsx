import React, { useState, useEffect } from 'react';
// common custom components
import { Navigation } from '../Navigation';
import { CustomHeader } from '../Header';
// Layout
import { Layout, Table } from 'antd';
// custom hook
import { useListCoins, useAllCoins } from '../hooks';

const loading = require('../_helpers/loading.gif');
// helpers
import { dynamicSort } from '../_helpers';

const { Content } = Layout;

import './HomePage.css';


export const HomePage = () => {

  const [coins, toCoins] = useState([]);

  const fetched = useAllCoins();
  useEffect(() => {
    toCoins(fetched);
    setTimeout(() => {
      const allimages = document.getElementsByTagName('img');
      for (let i = 0; i < allimages.length; i++) {
        if (allimages[i].getAttribute('data-src')) allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
      }
    }, 1200);
  }, [fetched]);

  const coinColumnsShort = [
  {
    title:'#Marketcap',
    dataIndex:'mc_rank',
    key:'1',
    sorter: (a, b) => a.mc_rank - b.mc_rank,
  },
  {
      title: 'Icon',
      dataIndex: 'img_url',
      key: '14',              
      render: image => <img src={loading} data-src={image} width="20" height="20" />
    },
    {
      title: 'Coin Name',
      dataIndex: 'coin_symbol',
      key: '2',              
      render: (volume, row) => {
        return row.coin_title;
      }
    },
    ,{
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: '3',
      sorter: (a, b) => a.market_cap - b.market_cap,
    },{
      title: 'Price',
      dataIndex: 'asset_price',
      key: '4'
    },{
      title: 'Price Change (24H)',
      dataIndex: 'asset_price_old',
      key: '5',
      render: (price, row) => {
        return `${Number.parseInt(((row.asset_price - price) / row.asset_price)*100)}%`;
      },
      sorter: (a, b) => a.asset_price_old - b.asset_price_old,
    },{
      title: 'Volume (24H)',
      dataIndex: 'volume_24_old',
      key: '6',      
      sorter: (a, b) => a.volume_24_old - b.volume_24_old,
    },
    {
      title: 'Volume Change',
      dataIndex: 'volume_24',
      key: '7',
      render: (volume, row) => {
        return `${Number.parseInt(((volume - row.volume_24_old) / volume)*100)}%`;
      },
      sorter: (a, b) => a.volume_24 - b.volume_24,
    },
    {
      title: 'All Time High',
      dataIndex: 'ath',
      key: '8',
      sorter: (a, b) => a.ath - b.ath,
    },
    {
      title: 'All Time Low',
      dataIndex: 'atl',
      key: '9',
      sorter: (a, b) => a.atl - b.atl,
    },    {
      title: 'Buy Support 5%',
      dataIndex: 'buy_support_5',
      key: '10',
      render: price => {
        return Number.parseInt(price) || 0
      },
      sorter: (a, b) => a.buy_support_5 - b.buy_support_5,
    },
    {
      title: 'Sell Support 5%',
      dataIndex: 'sell_support_5',
      key: '11',
      render: price => {
        return Number.parseInt(price) || 0
      },
      sorter: (a, b) => a.sell_support_5 - b.sell_support_5,
    },
    {
      title: 'TA Rating',
      dataIndex: 'ta_rating',
      key: '12',
      sorter: (a, b) => a.ta_rating - b.ta_rating,
    },
    {
      title: 'Volatility_30_USD',
      dataIndex: 'v_30_usd',
      key: '13',
      sorter: (a, b) => a.v_30_usd - b.v_30_usd,
    },
  ];

  // sort coins by mc_rank
  coins.sort(function(a,b){return a.mc_rank - b.mc_rank});

  return (
    <div>
      <Layout>
        <Navigation activeNav="1" />
        <Layout>
          <CustomHeader />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
            <Table className="homeTable" rowKey={coin => coin.coin_id} pagination={false} dataSource={coins} columns={coinColumnsShort} size="small" />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
