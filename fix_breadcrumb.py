
content = open('/workspaces/HRLake-Platform/app/countries/[code]/leave-benefits/page.tsx').read()
content = content.replace("url: `https://hrlake.com/countries/${code.toLowerCase()}/`", "href: `https://hrlake.com/countries/${code.toLowerCase()}/`")
content = content.replace("url: `https://hrlake.com/countries/${code.toLowerCase()}/leave-benefits/`", "href: `https://hrlake.com/countries/${code.toLowerCase()}/leave-benefits/`")
open('/workspaces/HRLake-Platform/app/countries/[code]/leave-benefits/page.tsx', 'w').write(content)
print('Done')
