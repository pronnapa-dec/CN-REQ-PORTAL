#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_item\tab\dimension.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "539f74c1ba919bf35f00ca346a75eca376eab4fd"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_item.tab.Pages_ACC_mas_item_tab_dimension), @"mvc.1.0.view", @"/Pages/ACC/mas_item/tab/dimension.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_item.tab
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"539f74c1ba919bf35f00ca346a75eca376eab4fd", @"/Pages/ACC/mas_item/tab/dimension.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_item_tab_dimension : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""tab-pane"" id=""dimension"" style=""font-size: 13px;"">
    <div class=""row"">
        <div class=""col-sm-12"">
            <div class=""row mg-t-15"">
                <div class=""col-sm-12"">
                    <div class=""card card-primary"">
                        <div class=""card-header pb-0"">
                            <span class=""card-title mb-0 pb-0"">Dimension</span>
                        </div>
                        <div class=""card-body"">
");
            WriteLiteral(@"                            <div class=""row"">
                                <div class=""col-sm-2"">
                                    <label for=""dim_width"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;??????????????????????????? W (??????.)</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=""dim_width"" name=""dim_width""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 1046, "\"", 1060, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>

                                <div class=""col-sm-2"">
                                    <label for=""dim_exp"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;??????????????????????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <label id=""dim_exp"" class=""col-form-label tx-left tx-value"" style=""margin-top: -3px;"">
");
            WriteLiteral(@"                                    </label>
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>
                            </div>

                            <div class=""row mg-t-15"">
                                <div class=""col-sm-2"">
                                    <label for=""dim_long"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;????????????????????? L (??????.)</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=""dim_long"" name=""dim_long""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 2612, "\"", 2626, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>

                                <div class=""col-sm-2"">
                                    <label for=""dim_careful"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <label id=""dim_careful"" class=""col-form-label tx-left tx-value"" style=""margin-top: -3px;"">
");
            WriteLiteral(@"                                    </label>
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>
                            </div>

                            <div class=""row mg-t-15"">
                                <div class=""col-sm-2"">
                                    <label for=""dim_height"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;????????????????????? H (??????.)</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=""dim_height"" name=""dim_height""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 4186, "\"", 4200, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>

                                <div class=""col-sm-2"">
                                    <label for=""dim_special"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;????????????????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <label id=""dim_special"" class=""col-form-label tx-left tx-value"" style=""margin-top: -3px;"">
");
            WriteLiteral(@"                                    </label>
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>
                            </div>

                            <div class=""row mg-t-15"">
                                <div class=""col-sm-2"">
                                    <label for=""dim_uom_qty"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;?????????????????????????????????????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=""dim_uom_qty"" name=""dim_uom_qty""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 5771, "\"", 5785, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>

                                <div class=""col-sm-2"">
                                    <label for=""dim_chem"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;???????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <label id=""dim_chem"" class=""col-form-label tx-left tx-value"" style=""margin-top: -3px;"">
");
            WriteLiteral(@"                                    </label>
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>
                            </div>

                            <div class=""row mg-t-15"">
                                <div class=""col-sm-2"">
                                    <label for=""dim_weight"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;??????????????????????????????????????? (??????.)</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=""dim_weight"" name=""dim_weight""");
            BeginWriteAttribute("placeholder", " placeholder=\"", 7344, "\"", 7358, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>

                                <div class=""col-sm-2"">
                                    <label for=""dim_bigsize"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;???????????????????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <label id=""dim_bigsize"" class=""col-form-label tx-left tx-value"" style=""margin-top: -3px;"">
");
            WriteLiteral(@"                                    </label>
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>
                            </div>

                            <div class=""row mg-t-15"">
                                <div class=""col-sm-2"">
                                    <label for=""dim_packing"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;???????????????????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
");
            WriteLiteral(@"                                    <label id=""dim_packing"" class=""col-form-label tx-left tx-value""></label>
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>

                                <div class=""col-sm-2"">
                                    <label for=""dim_created_datetime"" class=""col-form-label tx-left mg-l-10 form-label"">&nbsp;??????????????????????????????????????????????????????</label>
                                </div>
                                <div class=""col-sm-3"">
                                    <label id=""dim_created_datetime"" class=""col-form-label tx-left tx-value""></label>
                                </div>
                                <div class=""col-sm-1"">
                                    &nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       ");
            WriteLiteral("     </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
