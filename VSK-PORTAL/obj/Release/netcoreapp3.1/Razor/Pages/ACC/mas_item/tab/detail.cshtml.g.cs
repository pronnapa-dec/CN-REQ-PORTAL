#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_item\tab\detail.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "4c45364c2a7a7c60408c8468c4cbf856c840469b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_item.tab.Pages_ACC_mas_item_tab_detail), @"mvc.1.0.view", @"/Pages/ACC/mas_item/tab/detail.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"4c45364c2a7a7c60408c8468c4cbf856c840469b", @"/Pages/ACC/mas_item/tab/detail.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_item_tab_detail : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<div class=\"tab-pane\" id=\"detail\">\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4c45364c2a7a7c60408c8468c4cbf856c840469b3278", async() => {
                WriteLiteral(@"
        <div class=""row mg-t-10 mg-b-25"" style=""font-size:13px;"">
            <div class=""col-sm-9"">
                <div class=""card card-primary"">
                    <div class=""card-body"">
                        <div class=""col-sm-12"">
                            <div class=""row mg-t-6"">
                                <div class=""col-sm-4"">
                                    <label for=""item_partno"" class=""col-form-label tx-left"">หมายเลขอะไหล่ (Part Number)</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_gremark"" class=""col-form-label tx-left"">ลักษณะบรรจุ</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_codeoem"" class=""col-form-label tx-left"">OEM Search</label>
                                </div>
                            </div>
                            <div class=""ro");
                WriteLiteral("w\">\r\n                                <div class=\"col-sm-4\">\r\n                                    <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_partno\" name=\"item_partno\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1258, "\"", 1272, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                </div>\r\n                                <div class=\"col-sm-4\">\r\n                                    <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_gremark\" name=\"item_gremark\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1501, "\"", 1515, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                </div>\r\n                                <div class=\"col-sm-4\">\r\n                                    <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_codeoem\" name=\"item_codeoem\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1744, "\"", 1758, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                </div>
                            </div>


                            <div class=""row mg-t-6"">
                                <div class=""col-sm-4"">
                                    <label for=""item_engineno"" class=""col-form-label tx-left"">เลขเครื่อง (Engine No)</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_car_cc"" class=""col-form-label tx-left"">รถ CC Engine [A][B][C][D]</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_carbrand"" class=""col-form-label tx-left"">รถ Brand</label>
                                </div>
                            </div>
                            <div class=""row"">
                                <div class=""col-sm-4"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=");
                WriteLiteral("\"item_engineno\" name=\"item_engineno\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2819, "\"", 2833, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                </div>\r\n                                <div class=\"col-sm-4\">\r\n                                    <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_car_cc\" name=\"item_car_cc\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3060, "\"", 3074, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                </div>\r\n                                <div class=\"col-sm-4\">\r\n                                    <input type=\"text\" class=\"form-control form-control-sm\" id=\"item_carbrand\" name=\"item_carbrand\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3305, "\"", 3319, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                </div>
                            </div>


                            <div class=""row mg-t-6"">
                                <div class=""col-sm-4"">
                                    <label for=""item_carmodel"" class=""col-form-label tx-left"">รถ Model Name</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_year"" class=""col-form-label tx-left"">รถ Year From - To</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_carbodycode"" class=""col-form-label tx-left"">Body Code</label>
                                </div>
                            </div>
                            <div class=""row"">
                                <div class=""col-sm-4"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=""item_carmodel""");
                WriteLiteral(" name=\"item_carmodel\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4365, "\"", 4379, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                </div>
                                <div class=""col-sm-4"">
                                    <div class=""row"">
                                        <table style=""width: 90%;"" class=""mg-l-10"" border=""0"">
                                            <tr>
                                                <td style=""width: 46%;""><input type=""text"" class=""form-control form-control-sm"" style=""width: 100%;"" id=""item_carfyear"" name=""item_carfyear""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4868, "\"", 4882, 0);
                EndWriteAttribute();
                WriteLiteral(@"></td>
                                                <td style=""width: 6%;text-align:center;"">-</td>
                                                <td style=""width: 46%;""><input type=""text"" class=""form-control form-control-sm"" style=""width: 100%;"" id=""item_cartoyear"" name=""item_cartoyear""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5178, "\"", 5192, 0);
                EndWriteAttribute();
                WriteLiteral(@"></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class=""col-sm-4"">
                                    <input type=""text"" class=""form-control form-control-sm"" id=""item_carbodycode"" name=""item_carbodycode""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5579, "\"", 5593, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                </div>
                            </div>
                            <div class=""row mg-t-6"">
                                <div class=""col-sm-4"">
                                    <label for=""item_gdimension"" class=""col-form-label tx-left"">ส่วนขยายอื่น</label>
                                </div>
                            </div>
                            <div class=""row"">
                                <div class=""col-sm-4"">
                                    <input class=""form-control form-control-sm"" id=""item_gdimension"" name=""item_gdimension""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6203, "\"", 6217, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                </div>
                            </div>




                            <div class=""row mg-t-15"">
                                <div class=""col-sm-4"">
                                    <label for=""item_named"" class=""col-form-label tx-left"">จัดอยู่ในกลุ่ม (Definition)</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_itemgroup"" class=""col-form-label tx-left"">Item Group</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_gcondoth"" class=""col-form-label tx-left"">ประเภทอื่นๆ สินค้า</label>
                                </div>
                            </div>
                            <div class=""row"">
                                <div class=""col-sm-4"">
                                    <select class=""form-control form-control-sm select2"" i");
                WriteLiteral("d=\"item_category\" name=\"item_category\" style=\"width: 100%;\">\r\n                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4c45364c2a7a7c60408c8468c4cbf856c840469b12913", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                    </select>
                                </div>
                                <div class=""col-sm-4"">
                                    <select class=""form-control form-control-sm select2"" id=""item_itemgroup"" name=""item_itemgroup"" style=""width: 100%;"">
                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4c45364c2a7a7c60408c8468c4cbf856c840469b14283", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                    </select>
                                </div>
                                <div class=""col-sm-4"">
                                    <select class=""form-control form-control-sm select2"" id=""item_gcondoth"" name=""item_gcondoth"" style=""width: 100%;"">
                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4c45364c2a7a7c60408c8468c4cbf856c840469b15651", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                    </select>
                                </div>
                            </div>


                            <div class=""row mg-t-6"">
                                <div class=""col-sm-4"">
                                    <label for=""item_category"" class=""col-form-label tx-left"">Car Category</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_subcategory"" class=""col-form-label tx-left"">Car Sub Category</label>
                                </div>
                                <div class=""col-sm-4"">
                                    <label for=""item_gset"" class=""col-form-label tx-left"">ประเภทสินค้า SET</label>
                                </div>
                            </div>
                            <div class=""row"">
                                <div class=""col-sm-4"">
                                    <select class=""form-con");
                WriteLiteral("trol form-control-sm select2\" id=\"item_category\" name=\"item_category\" style=\"width: 100%;\">\r\n                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4c45364c2a7a7c60408c8468c4cbf856c840469b17898", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                    </select>
                                </div>
                                <div class=""col-sm-4"">
                                    <select class=""form-control form-control-sm select2"" id=""item_subcategory"" name=""item_subcategory"" style=""width: 100%;"">
                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4c45364c2a7a7c60408c8468c4cbf856c840469b19272", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                    </select>
                                </div>
                                <div class=""col-sm-4"">
                                    <select class=""form-control form-control-sm select2"" id=""item_gset"" name=""item_gset"" style=""width: 100%;"">
                                        ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "4c45364c2a7a7c60408c8468c4cbf856c840469b20632", async() => {
                    WriteLiteral("Please select..");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                    </select>
                                </div>
                            </div>

                            <div class=""row mg-t-6"">
                                <div class=""col-sm-6"">
                                    <label for=""item_gdescrip"" class=""col-form-label tx-left"">คำอธิบายลักษณะการใช้งาน</label>
                                </div>
                            </div>
                            <div class=""row"">
                                <div class=""col-sm-8"">
                                    <textarea class=""form-control form-control-sm"" rows=""3"" id=""item_gdescrip"" name=""item_gdescrip""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 10715, "\"", 10729, 0);
                EndWriteAttribute();
                WriteLiteral(@"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class=""col-sm-3"">
                <div class=""col-sm-12"">
                    <div class=""card card-success"">
                        <div class=""card-body"">
                            <label for=""item_prodgroup"" class=""col-sm-12 col-form-label tx-left mg-t-6"">Product Group</label>
                            <div class=""col-sm-12"">
                                <input class=""form-control form-control-sm"" id=""item_prodgroup"" name=""item_prodgroup""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 11404, "\"", 11418, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n");
                WriteLiteral(@"                            </div>
                            <label for=""item_prodclass"" class=""col-sm-12 col-form-label tx-left mg-t-6"">Product Class</label>
                            <div class=""col-sm-12"">
                                <input class=""form-control form-control-sm"" id=""item_prodclass"" name=""item_prodclass""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 12030, "\"", 12044, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n");
                WriteLiteral(@"                            </div>
                            <label for=""item_minstock"" class=""col-sm-12 col-form-label tx-left mg-t-6"">Stock Minimum</label>
                            <div class=""col-sm-12"">
                                <input class=""form-control form-control-sm"" id=""item_minstock"" name=""item_minstock""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 12653, "\"", 12667, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n");
                WriteLiteral(@"                            </div>
                            <label for=""item_maxstock"" class=""col-sm-12 col-form-label tx-left mg-t-6 mg-b-15"">Stock Maximum</label>
                            <div class=""col-sm-12"">
                                <input class=""form-control form-control-sm"" id=""item_maxstock"" name=""item_maxstock""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 13282, "\"", 13296, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n");
                WriteLiteral(@"                            </div>

                        </div>
                    </div>
                </div>


                <div class=""col-sm-12"">
                    <div class=""card card-danger"">
                        <div class=""card-body"">
                            <div class=""row mg-t-10"">
                                <div class=""col-lg-8"">
                                    <label class=""ckbox mg-l-25"" style=""font-weight: bold;"">
                                        <input type=""checkbox"" id=""donotpur"" name=""donotpur"">
                                        <span class=""tx-normal"">ห้ามซื้อ</span>
                                    </label>
                                </div>
                            </div>

                            <div class=""row mg-t-20"">
                                <div class=""col-lg-8"">
                                    <label class=""ckbox mg-l-25"" style=""font-weight: bold;"">
                                        <input");
                WriteLiteral(@" type=""checkbox"" id=""donotsale"" name=""donotsale"">
                                        <span class=""tx-normal"">ห้ามขาย</span>
                                    </label>
                                </div>
                            </div>

                            <div class=""row mg-t-20"">
                                <div class=""col-lg-8"">
                                    <label class=""ckbox mg-l-25"" style=""font-weight: bold;"">
                                        <input type=""checkbox"" id=""inactive"" name=""inactive"">
                                        <span class=""tx-normal"">Inactive</span>
                                    </label>
                                </div>
                            </div>

                            <div class=""row mg-t-20 mg-b-15"">
                                <div class=""col-lg-8"">
                                    <label class=""ckbox mg-l-25"" style=""font-weight: bold;"">
                                        <input type");
                WriteLiteral(@"=""checkbox"" id=""custconfirm"" name=""custconfirm"">
                                        <span class=""tx-normal"">เฉพาะรับลูกค้า</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</div>");
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