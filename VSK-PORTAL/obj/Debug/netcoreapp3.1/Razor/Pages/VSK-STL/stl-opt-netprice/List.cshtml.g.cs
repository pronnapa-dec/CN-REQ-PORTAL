#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-STL\stl-opt-netprice\List.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8fca5fbdcae61f84b04a1432bd7d823da6b19bb9"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_STL.stl_opt_netprice.Pages_VSK_STL_stl_opt_netprice_List), @"mvc.1.0.view", @"/Pages/VSK-STL/stl-opt-netprice/List.cshtml")]
namespace MIS_PORTAL.Pages.VSK_STL.stl_opt_netprice
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
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8fca5fbdcae61f84b04a1432bd7d823da6b19bb9", @"/Pages/VSK-STL/stl-opt-netprice/List.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_STL_stl_opt_netprice_List : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_item"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_item"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("data-parsley-validate", new global::Microsoft.AspNetCore.Html.HtmlString(""), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""col-12 col-sm-12"">
    <div class=""card"">
        <div class=""card-header pb-0 "">
            <div class=""row"">
                <div class=""col-sm-6 mg-t-10"">
                    <h5 class=""card-title"" id=""tiltle-table"">รายละเอียดตารางราคา NET</h5>
                </div>
                <div class=""col-sm-2"">
                </div>
                <div class=""col-sm-4"">
                    <div class=""input-group"">
                        <select class=""form-control select2"" id=""search_prnetfile"" name=""search_prnetfile"" data-width=""100%"">
                            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8fca5fbdcae61f84b04a1432bd7d823da6b19bb95622", async() => {
                WriteLiteral("\r\n                                --- Select Search ---\r\n                            ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                        </select>
                    </div><!-- input-group -->
                </div>
            </div>
        </div>
        <div class=""col-sm-12 mg-t-20"">
            <div class=""panel panel-primary tabs-style-2"">
                <div class="" tab-menu-heading"">
                    <div class=""tabs-menu1"">
                        <!-- Tabs -->
                        <ul class=""nav panel-tabs main-nav-line"">
                            <li><a href=""#tab4"" class=""nav-link active"" data-toggle=""tab"">สินค้า</a></li>
                            <li><a class=""nav-link tx-danger active"" data-toggle=""tab"" >รายละเอียด:<span class=""ml-2"" style=""color: black;"" id=""item_detail""></span></a></li>
");
            WriteLiteral("                          \r\n                        </ul>\r\n                       \r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body tabs-menu-body main-content-body-right border\">\r\n                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8fca5fbdcae61f84b04a1432bd7d823da6b19bb97905", async() => {
                WriteLiteral(@"

                        <div class=""tab-content"">
                            <div class=""tab-pane active"" id=""tab4"">
                                <table class=""table mg-b-0-f text-md-nowrap"">
                                    <thead style=""font-size:11px; text-align:center"">
                                        <tr>
                                            <th class=""tx-center"">รายการสินค้า</th>
                                            <th class=""tx-center"">QTY-A</th>
                                            <th class=""tx-center"">QTY-B</th>
                                            <th class=""tx-center"">UOM</th>
                                            <th class=""tx-center"">Avg.s.Cost</th>
                                            <th class=""tx-center"">Now.Cost</th>
                                            <th class=""tx-center"">%ส่วนต่าง</th>
                                            <th class=""tx-center d-none"">Vat</th>
                                          ");
                WriteLiteral(@"  <th class=""tx-center d-none"">Suggested</th>
                                            <th class=""tx-center"">Net</th>
                                            <th class=""tx-center""></th>
                                        </tr>
                                    </thead>
                                    <tbody style=""font-size: 11px; text-align: center""");
                BeginWriteAttribute("class", " class=\"", 3346, "\"", 3354, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                        <tr>
                                            <td style=""width: 28%;"">
                                                <select id=""search_itemmaster"" class=""form-control"" required>
                                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8fca5fbdcae61f84b04a1432bd7d823da6b19bb910072", async() => {
                    WriteLiteral("--- Select Search ---");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                BeginWriteTagHelperAttribute();
                __tagHelperStringValueBuffer = EndWriteTagHelperAttribute();
                __tagHelperExecutionContext.AddHtmlAttribute("selected", Html.Raw(__tagHelperStringValueBuffer), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.Minimized);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                                </select>\r\n                                            </td>\r\n");
                WriteLiteral(@"                                            <td><input type=""number"" min=""1"" max=""100"" style=""width: 80px;"" class=""form-control tx-right"" id=""Qty_A"" placeholder=""0"" step=""1"" required></td>
                                            <td><input type=""number"" min=""1"" max=""100"" style=""width: 80px;"" class=""form-control tx-right"" id=""Qty_B"" placeholder=""0"" step=""1"" required></td>
");
                WriteLiteral(@"                                            <td><input type=""text"" class=""form-control tx-center-f c_text"" style=""width: 80px;"" id=""gunit"" placeholder=""หน่วย"" required></td>
                                            <td><div class=""tx-center-f c_text"" id=""avgcost"" style=""margin-top:12px;"">0.00</div></td>
                                            <td><div class=""tx-center-f c_text"" id=""nowcost"" style=""margin-top:12px;"">0.00</div></td>
                                            <td><div class=""tx-center-f c_text"" id=""difference"" style=""margin-top: 12px; width: 80px;"">0%</div></td>
                                            <td class=""d-none""><div class=""tx-center-f c_text d-none"" id=""vat""></div></td>
                                            <td class=""d-none""><div class=""tx-center-f c_text d-none"" id=""suggested"">0.00</div></td>
                                            <td><input type=""text"" min=""1.00"" class=""form-control tx-right"" id=""NetPrice"" placeholder=""0.00"" ");
                WriteLiteral(@" required data-parsley-type=""number""></td>

                                            <td class=""d-flex flex-row justify-content-center"">
                                                <button style=""margin: 0 .125rem; "" class=""btn btn-outline-primary btn-block btn-icon pril-btn-action"" data-action=""create"" id=""pril_create_item"" type=""submit""><i class=""typcn typcn-document-add""></i></button>
                                                <button style=""margin: 0 .125rem; "" class=""btn btn-outline-secondary btn-icon btn-action pril-btn-reset"" data-action=""reset"" id=""btn-reset"" type=""reset""><i class=""fas fa-undo""></i></button>
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                                <hr style=""margin-top:0px"">
                                <table id=""tbl-net_list"" class=""table mg-b-0 text-md-nowrap"">
                                    <");
                WriteLiteral(@"thead style=""font-size:10px; text-align:center"">
                                        <tr>
                                            <th valign=""middle"" width=""3%"" class=""tx-center""></th>
                                            <th valign=""middle"" class=""tx-center"">รายการสินค้า</th>
                                            <th valign=""middle"" width=""7%"" class=""tx-center"">QTY-A</th>
                                            <th valign=""middle"" width=""7%"" class=""tx-center"">QTY-B</th>
                                            <th valign=""middle"" width=""8%"" class=""tx-center"">UOM</th>
                                            <th valign=""middle"" width=""8%"" class=""tx-center"">Avg.s.Cost</th>
                                            <th valign=""middle"" width=""8%"" class=""tx-center"">Now.Cost</th>
                                            <th valign=""middle"" width=""7%"" class=""tx-center"">%ส่วนต่าง</th>
                                            <th valign=""middle"" width=""8%"" class=""tx-ce");
                WriteLiteral(@"nter d-none"">Vat</th>
                                            <th valign=""middle"" width=""8%"" class=""tx-center d-none"">Suggested</th>
                                            <th valign=""middle"" width=""8%"" class=""tx-center"">Net</th>
                                            <th valign=""middle"" width=""6%"" class=""tx-center""></th>
                                        </tr>
                                    </thead>
                                    <tbody style=""max-height: 500px; overflow-y: scroll; font-size: 11px; text-align: center"" class=""prnettra_list""></tbody>
                                </table>
                            </div>

                        </div>
                    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"

                </div>
            </div>
        </div>

        <div class=""col-sm-12 mg-t-20 mg-b-20"">
            <div class=""panel panel-success tabs-style-2"">
                <div class="" tab-menu-heading"">
                    <div class=""tabs-menu1"">
                        <!-- Tabs -->
                        <ul class=""nav panel-tabs main-nav-line"">
                            <li><a href=""#tab4"" class=""nav-link active"" data-toggle=""tab"">ลูกค้า</a></li>
                        </ul>
                    </div>
                </div>
                <div class=""panel-body tabs-menu-body main-content-body-right border"">
                    <div class=""tab-content"">
                        <div class=""tab-pane active"" id=""tab4"">
                            <table id=""tbl-emmas_list"" class=""table mg-b-0 text-md-nowrap"">
                                <thead style=""font-size:11px; text-align:center"">
                                    <tr>
                                        ");
            WriteLiteral(@"<th width=""3%"" class=""tx-center"">#</th>
                                        <th class=""tx-center"">รหัส</th>
                                        <th class=""tx-center"">ลูกค้า</th>
                                        <th width=""20%"" class=""tx-center"">ที่อยู่</th>
                                        <th width=""12%"" class=""tx-center"">ตำบล</th>
                                        <th width=""12%"" class=""tx-center"">อำเภอ</th>
                                        <th width=""12%"" class=""tx-center"">จังหวัด</th>
                                        <th width=""12%"" class=""tx-center"">รหัสไปษณีย์</th>
");
            WriteLiteral(@"                                    </tr>
                                </thead>
                                <tbody style=""font-size:11px; text-align:center"">
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
");
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
