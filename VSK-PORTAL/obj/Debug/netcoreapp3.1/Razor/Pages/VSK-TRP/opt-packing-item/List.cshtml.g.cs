#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-TRP\opt-packing-item\List.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "21e96cc4e5c4e483e6326c56969d522c217abb24"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_TRP.opt_packing_item.Pages_VSK_TRP_opt_packing_item_List), @"mvc.1.0.view", @"/Pages/VSK-TRP/opt-packing-item/List.cshtml")]
namespace MIS_PORTAL.Pages.VSK_TRP.opt_packing_item
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"21e96cc4e5c4e483e6326c56969d522c217abb24", @"/Pages/VSK-TRP/opt-packing-item/List.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_TRP_opt_packing_item_List : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontal"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_job"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_job"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral("<div class=\"col-12 col-sm-12\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header pb-0\">\r\n            <h5 class=\"card-title mb-0 pb-0\">");
#nullable restore
#line 4 "D:\Project\vsk-project\MIS-PORTAL-8099\CN\VSK-PORTAL\Pages\VSK-TRP\opt-packing-item\List.cshtml"
                                        Write(ViewData["Content-Title-Page"]);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"</h5>
            <div class=""main-dashboard-header-right"" style=""margin-top:-20px;"">
                <div>
                    <label class=""tx-13"">จำนวนบิล</label>
                    <div><h5 id=""sum_qty_inv"">0</h5>บิล</div>
                </div>
                <div>
                    <label class=""tx-13"">จำนวนสินค้า</label>
                    <div><h5 id=""sum_qty_item"">0</h5>รายการ</div>
                </div>
                <div>
                    <label class=""tx-13"">จำนวนปัจจุบัน</label>
                    <div><h5 id=""sum_qty_current"">0</h5> หน่วย</div>
                </div>
                <div>
                    <label class=""tx-13"">จำนวนทั้งหมด</label>
                    <div><h5 id=""sum_qty_total"">0</h5> หน่วย</div>
                </div>
            </div>
        </div>
        <div class=""card-body"">
            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "21e96cc4e5c4e483e6326c56969d522c217abb245909", async() => {
                WriteLiteral(@"
                <div class=""kt-portlet__body"">
                    <div class=""form-group form-group-sm row"">
                        <label class=""col-md-1 col-form-label"">เลขที่ PCK</label>
                        <div class=""col-md-3"">
                            <div class=""input-group"">
                                <input type=""text"" class=""form-control"" id=""job_number"" name=""job_number""");
                BeginWriteAttribute("value", " value=\"", 1527, "\"", 1535, 0);
                EndWriteAttribute();
                WriteLiteral(@"> <span class=""input-group-btn""><button class=""btn btn-dark"" type=""reset"" id=""btn-main"" onClick=""window.location.reload();""><span class=""input-group-btn""><i class=""fas fa-redo-alt""></i></span></button></span>
                            </div>
                        </div>
                        <label class=""col-md-1 col-form-label"">วันที่ PCK</label>
                        <div class=""col-md-3"">
                            <div class=""input-group"">
                                <input type=""text"" class=""form-control"" id=""job_date"" name=""job_date""");
                BeginWriteAttribute("value", " value=\"", 2101, "\"", 2109, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                            </div>
                        </div>
                        <label class=""col-md-1 col-form-label"">ผู้จัดส่ง</label>
                        <div class=""col-md-3"">
                            <input type=""text"" class=""form-control"" id=""transport_start"" name=""transport_start""");
                BeginWriteAttribute("value", " value=\"", 2431, "\"", 2439, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                        </div>
                    </div>
                    <!-- 1 -->
                    <div class=""form-group form-group-sm row"">
                        <label class=""col-md-1 col-form-label"">ลูกค้า</label>
                        <div class=""col-md-1"">
                            <input type=""text"" class=""form-control"" id=""emmas_code"" name=""emmas_code""");
                BeginWriteAttribute("value", " value=\"", 2836, "\"", 2844, 0);
                EndWriteAttribute();
                WriteLiteral(" disabled>\r\n                        </div>\r\n                        <div class=\"col-md-3\">\r\n                            <input type=\"text\" class=\"form-control\" id=\"emmas_name\" name=\"emmas_name\"");
                BeginWriteAttribute("value", " value=\"", 3038, "\"", 3046, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                        </div>
                        <label class=""col-md-1 col-form-label"">ที่อยู่/จัดส่ง</label>
                        <div class=""col-md-6"">
                            <input type=""text"" class=""form-control"" id=""emmas_address"" name=""emmas_address""");
                BeginWriteAttribute("value", " value=\"", 3333, "\"", 3341, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                        </div>
                    </div>
                    <!-- 2 -->
                    <div class=""form-group form-group-sm row hideny d-none"">
                        <label class=""col-md-1 col-form-label"">บาร์โค้ด</label>
                        <div class=""col-md-3"">
                            <input type=""text"" class=""form-control"" id=""keywords"" name=""keywords""");
                BeginWriteAttribute("value", " value=\"", 3750, "\"", 3758, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                        </div>
                        <label class=""col-md-1 col-form-label"">จำนวน</label>
                        <div class=""col-md-3"">
                            <input type=""number"" class=""form-control"" id=""job_detail_qty"" name=""job_detail_qty"" value=""1"" min=""0"" step=""1"" required data-parsley-error-message="""">
                        </div>
                        <label class=""col-md-1 col-form-label"">ผู้ตรวจสอบ</label>
                        <div class=""col-md-3"">
                            <input type=""text"" class=""form-control"" id=""user"" name=""user""");
                BeginWriteAttribute("value", " value=\"", 4352, "\"", 4360, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                        </div>
                    </div>

                    <div class=""border-top my-3""></div>

                    <div id=""pck_list"" class=""form-group form-group-sm row d-none"">

                        <label for=""pck_qty"" class=""col-md-1 col-form-label"">จำนวน/กล่อง</label>
                        <div class=""col-md-1"">
                            <input type=""number"" class=""form-control tx-center"" id=""pck_qty"" name=""pck_qty"" min=""0"" step=""1""");
                BeginWriteAttribute("required", " required=\"", 4851, "\"", 4862, 0);
                EndWriteAttribute();
                WriteLiteral(" value=\"0\"");
                BeginWriteAttribute("disabled", " disabled=\"", 4873, "\"", 4884, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                        </div>
                        <label class=""col-form-label mr-3"">ขนาด</label>

                        <label for=""size_a"" class=""col-form-label"">A</label>
                        <div class=""col-md"">
                            <input type=""number"" min=""0"" class=""form-control tx-center size_box"" id=""size_A"" name=""size_A"" value=""0"">
                        </div>
                        <label for=""size_b"" class=""col-form-label"">B</label>
                        <div class=""col-md"">
                            <input type=""number"" min=""0"" class=""form-control tx-center size_box"" id=""size_B"" name=""size_B"" value=""0"">
                        </div>
                        <label for=""size_c"" class=""col-form-label"">C</label>
                        <div class=""col-md"">
                            <input type=""number"" min=""0"" class=""form-control tx-center size_box"" id=""size_C"" name=""size_C"" value=""0"">
                        </div>
                        <label for=""size_");
                WriteLiteral(@"d"" class=""col-form-label"">D</label>
                        <div class=""col-md"">
                            <input type=""number"" min=""0"" class=""form-control tx-center size_box"" id=""size_D"" name=""size_D"" value=""0"">
                        </div>
                        <label for=""size_e"" class=""col-form-label"">E</label>
                        <div class=""col-md"">
                            <input type=""number"" min=""0"" class=""form-control tx-center size_box"" id=""size_E"" name=""size_E"" value=""0"">
                        </div>
                        <label for=""size_f"" class=""col-form-label"">F</label>
                        <div class=""col-md"">
                            <input type=""number"" min=""0"" class=""form-control tx-center size_box"" id=""size_F"" name=""size_F"" value=""0"">
                        </div>
                        <label for=""size_more"" class=""col-form-label"">อื่นๆ</label>
                        <div class=""col-md"">
                            <input type=""number"" min=""0"" clas");
                WriteLiteral(@"s=""form-control tx-center size_box"" id=""size_Z"" name=""size_Z"" value=""0"">
                        </div>

                        <div class=""col-md main-toggle-group-demo mg-t-10"">
                            <div class=""default-switches main-toggle main-toggle-dark on"" id=""packing-switches"">
                                <span></span>
                            </div>
                        </div>
                        <div class=""col-md tx-right"">
                            <button type=""button"" class=""btn btn-dark"" id=""btn-packing_box"" style=""width: 120px;"">บรรจุกล่อง</button>
                        </div>
                        <div class=""col-md tx-right"">
                            <button type=""button"" class=""btn btn-warning tx-dark"" id=""btn-share_box"" style=""width: 120px;"">ใช้กล่องรวม</button>
                        </div>
                        <div class=""col-md tx-right"">
                            <button type=""button"" class=""btn btn-danger"" id=""btn-delete_box"" style=""w");
                WriteLiteral("idth: 120px;\">ลบกล่อง</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            <div class=""border-top my-3""></div>
            <div class=""table-responsive mg-t-20"">
                <table id=""tbl-list"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap"">
                    <thead>
                        <tr>
                            <th class=""d-none"">id</th>
                            <th><div style=""text-align:center;"">ลำดับ</div></th>
                            <th><div style=""text-align:center;"">บาร์โค้ด</div></th>
                            <th><div style=""text-align:center;"">ชื่อสินค้า</div></th>
                            <th><div style=""text-align:center;"">เลขอะไหล่</div></th>
                            <th><div style=""text-align:center;"">จำนวนย่อย</div></th>
                            <th class=""d-none""><div style=""text-align:center;"">จำนวนหลัก</div></th>
                            <th><div style=""text-align:center;"">หน่วยนับ</div></th>
                            <th><div style=""text-align:center;"">ผู้ตรวจสอบ</di");
            WriteLiteral("v></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
