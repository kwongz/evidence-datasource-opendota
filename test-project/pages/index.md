```sql pro_matches
SELECT * FROM pro_matches
```

```sql heroes
SELECT * FROM heroes
```

```sql heroStats
SELECT * FROM heroStats
```

```sql pro_ban_pick_win
SELECT localized_name as Hero, pro_ban as banned, pro_win as win, pro_pick as pick
FROM heroStats
ORDER BY pro_ban DESC, pro_win DESC, pro_pick DESC
LIMIT 10
```

<h1>Top 10: Pro Hero {inputs.proSelector}</h1>
<Dropdown name=proSelector>
    <DropdownOption valueLabel="Wins" value="win" />
    <DropdownOption valueLabel="Bans" value="banned" />
    <DropdownOption valueLabel="Picks" value="pick" />
</Dropdown>
<BarChart 
    data={pro_ban_pick_win}
    x=Hero
    y={inputs.proSelector}
    series=Hero
    swapXY=true
    legend=false
/>
