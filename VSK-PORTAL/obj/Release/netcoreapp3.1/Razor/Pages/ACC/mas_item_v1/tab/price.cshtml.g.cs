#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_item_v1\tab\price.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fa322d5cda61eeb6801cab4f161f5e12f3683ffd"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_item_v1.tab.Pages_ACC_mas_item_v1_tab_price), @"mvc.1.0.view", @"/Pages/ACC/mas_item_v1/tab/price.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_item_v1.tab
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fa322d5cda61eeb6801cab4f161f5e12f3683ffd", @"/Pages/ACC/mas_item_v1/tab/price.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_item_v1_tab_price : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<div class=\"tab-pane\" id=\"price\">\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "fa322d5cda61eeb6801cab4f161f5e12f3683ffd3161", async() => {
                WriteLiteral(@"
        <div class=""row"">
            <div class=""col-sm-12"">

                <div class=""card card-primary"">
                    <div class=""card-header pb-0"">
                        <h5 class=""card-title mb-0 pb-0"">ตารางราคาขายหลัก</h5>
                    </div>
                    <div class=""card-body"" style=""font-size: 12px;"">
                        <div class=""row"">
                            <div class=""col-sm-8"">
                                <div class=""row"">
                                    <label for=""item_gprice"" class=""col-sm-2 col-form-label tx-left"">ราคาขาย (ราคาตั้ง)</label>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 875, "\"", 889, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>

                                    <label for=""item_gpricepur"" class=""col-sm-2 col-form-label tx-right"">ราคาขาย (ราคาซื้อ)</label>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1286, "\"", 1300, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-15"">
                                    <!-- ราคาขาย A -->
                                    <label for=""item_gprice"" class=""col-sm-2 col-form-label tx-left"">ราคาขาย A</label>
                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1833, "\"", 1847, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricea"" name=""item_gpricea""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2105, "\"", 2119, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-4\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm tx-right tx-bold\" id=\"item_gpera\" name=\"item_gpera\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2373, "\"", 2387, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-5"">
                                    <!-- ราคาขาย B -->
                                    <label for=""item_gprice"" class=""col-sm-2 col-form-label tx-left"">ราคาขาย B</label>
                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2919, "\"", 2933, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpriceb"" name=""item_gpriceb""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3191, "\"", 3205, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-4\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm tx-right tx-bold\" id=\"item_gperb\" name=\"item_gperb\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3459, "\"", 3473, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-5"">
                                    <!-- ราคาขาย C -->
                                    <label for=""item_gprice"" class=""col-sm-2 col-form-label tx-left"">ราคาขาย C</label>
                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4005, "\"", 4019, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricec"" name=""item_gpricec""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4277, "\"", 4291, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-4\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm tx-right tx-bold\" id=\"item_gperc\" name=\"item_gperc\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4545, "\"", 4559, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-5"">
                                    <!-- ราคาขาย D -->
                                    <label for=""item_gprice"" class=""col-sm-2 col-form-label tx-left"">ราคาขาย D</label>
                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5091, "\"", 5105, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpriced"" name=""item_gpriced""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5363, "\"", 5377, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-4\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm tx-right tx-bold\" id=\"item_gperd\" name=\"item_gperd\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5631, "\"", 5645, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-5"">
                                    <!-- ราคาขาย E -->
                                    <label for=""item_gprice"" class=""col-sm-2 col-form-label tx-left"">ราคาขาย E</label>
                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6177, "\"", 6191, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricee"" name=""item_gpricee""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6449, "\"", 6463, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-4\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm tx-right tx-bold\" id=\"item_gpere\" name=\"item_gpere\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6717, "\"", 6731, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-5"">
                                    <!-- ราคาขาย F -->
                                    <label for=""item_gprice"" class=""col-sm-2 col-form-label tx-left"">ราคาขาย F</label>
                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7263, "\"", 7277, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-4"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricef"" name=""item_gpricef""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7535, "\"", 7549, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n                                    </div>\r\n                                    <div class=\"col-sm-4\">\r\n                                        <input type=\"text\" class=\"form-control form-control-sm tx-right tx-bold\" id=\"item_gperf\" name=\"item_gperf\"");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7803, "\"", 7817, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>
                            </div>
                            <div class=""col-sm-4"">
                                <div class=""row"">
                                    <div class=""col-sm-6"">
                                        <label for=""item_salecost"" class=""col-sm-12 col-form-label tx-left"">Sale Cost</label>
                                    </div>
                                    <div class=""col-sm-6"">
                                        <label for=""item_gcost"" class=""col-sm-12 col-form-label tx-left"">ต้นทุนล่าสุด</label>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold col-sm-12"" id=""item_salecost"" name=""item_salecost""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8819, "\"", 8833, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold col-sm-12"" id=""item_gcost"" name=""item_gcost""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9097, "\"", 9111, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row"">
                                    <div class=""col-sm-6"">
                                        <label for=""item_avgsalecost"" class=""col-sm-12 col-form-label tx-left"">Average Sale Cost</label>
                                    </div>
                                    <div class=""col-sm-6"">
                                        <label for=""item_avgcost"" class=""col-sm-12 col-form-label tx-left"">Average Cost</label>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold col-sm-12"" id=""item_avgsalecost"" name=""item_avgsalecost""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 10046, "\"", 10060, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-6"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold col-sm-12"" id=""item_avgcost"" name=""item_avgcost""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 10328, "\"", 10342, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>

                                <div class=""row mg-t-25"">
                                    <div class=""col-sm-6"">
                                        <label for=""item_qtysmall"" class=""col-sm-12 col-form-label tx-left"" style=""padding-left: -50px;"">ตัว x หน่วยย่อย</label>
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold col-sm-12"" id=""item_qtysmall"" name=""item_qtysmall""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 10875, "\"", 10889, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                        <center><button class=""row btn btn-primary mg-t-15"" id=""btn-save_price""><i class=""fa fa-save""></i>&nbsp;&nbsp;&nbsp;บันทึก</button></center>
                                    </div>

                                    <div class=""col-sm-6 card card-danger"">
                                        <label for=""item_costtype"" class=""col-sm-12 col-form-label tx-left mg-t-10"">กำหนดใช้ต้นทุนขาย</label>
                                        <div class=""col-sm-12 mg-t-6""><input type=""radio"" class=""costtype"" name=""item_costtype"" id=""item_costtype_1"" value=""1"">&nbsp;&nbsp;&nbsp;<span class=""mg-b-6"">ต้นทุนล่าสุด</span></div>
                                        <div class=""col-sm-12 mg-t-6 mg-b-20""><input type=""radio"" class=""costtype"" name=""item_costtype"" id=""item_costtype_2"" value=""2"">&nbsp;&nbsp;&nbsp;<span class=""mg-b-6"">Average Cost</span></div>
                                    </div>
                                </div>
                            </d");
                WriteLiteral(@"iv>
                        </div>
                    </div>
                </div>
            </div>



            <div class=""col-sm-12"">
                <div class=""card card-primary"">
                    <div class=""row card-header pb-0 justify-content-between"">
                        <h5 class=""card-title mb-0 my-auto pb-0"">ตารางราคา 2</h5>
                        <button id=""btn-addnewqty"" type=""button"" class=""row btn btn-sm btn-primary mg-t-5 mg-r-15 my-xl-auto"" style=""height: 30px;"" data-toggle=""modal"" data-target=""#modal-frm_data_addnewqty""><i class=""fa fa-plus""></i>&nbsp;&nbsp;&nbsp;เพิ่มหน่วยนับ</button>
                    </div>
                    <div class=""card-body"">
");
                WriteLiteral(@"

                        <table class=""table table-bordered mg-b-0 text-md-nowrap no-footer"" style=""font-size: 12px;"">
                            <tr style=""font-size: 12px;font-weight: normal !important;text-align: center;"">
                                <th>หน่วยนับ</th>
                                <th>จำนวน</th>
                                <th>ตัว x หน่วยย่อย</th>
                                <th>ราคาตั้ง</th>
                                <th>ราคาขาย A</th>
                                <th>ราคาขาย B</th>
                                <th>ราคาขาย C</th>
                                <th>ราคาขาย D</th>
                                <th>ราคาขาย E</th>
                                <th>ราคาขาย F</th>
                                <th>หน่วยนับ Output</th>
                                <th>Del</th>
                                <th>PU</th>
                                <th>ราคาตั้งซื้อ</th>
                            </tr>
                            <tr>");
                WriteLiteral(@"
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                              ");
                WriteLiteral(@"  <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </table>
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
