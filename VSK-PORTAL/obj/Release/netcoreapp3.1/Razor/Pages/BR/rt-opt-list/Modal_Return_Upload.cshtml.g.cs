#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\BR\rt-opt-list\Modal_Return_Upload.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "66532bed3adda24f61f275eaf781042de6c5c231"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.BR.rt_opt_list.Pages_BR_rt_opt_list_Modal_Return_Upload), @"mvc.1.0.view", @"/Pages/BR/rt-opt-list/Modal_Return_Upload.cshtml")]
namespace MIS_PORTAL.Pages.BR.rt_opt_list
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"66532bed3adda24f61f275eaf781042de6c5c231", @"/Pages/BR/rt-opt-list/Modal_Return_Upload.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_BR_rt_opt_list_Modal_Return_Upload : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontal"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_upload"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_upload"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral(@"<!-- Scroll with content modal -->
<div class=""modal effect-flip-vertical"" id=""modal-return_upload"" data-keyboard=""false"" data-backdrop=""static"">
    <div class=""modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"" role=""document"">
        <div class=""modal-content modal-content-demo"" style=""width: 110%"">

            <div class=""modal-header justify-content-between"">
                <div class=""my-auto"">
                    <div class=""d-flex"">
                        <span class=""modal-title"" style=""font-size:14px;"">ตารางกำหนดราคาสินค้า NET</span>
                    </div>
                </div>
                <div class=""main-dashboard-header-right"">
                    <div>
                        <label class=""tx-13"">ข้อมูลทั้งหมด</label>
                        <div><h5 id=""all_information"">0</h5>รายการ</div>
                    </div>
                    <div>
                        <label class=""tx-13"">ข้อมูลผิดพลาด</label>
                        <div><h5 id=""wro");
            WriteLiteral(@"ng_information"">0</h5> หน่วย</div>
                    </div>
                    <div>
                        <label class=""tx-13"">ข้อมูลสำเร็จ</label>
                        <div><h5 id=""success_information"">0</h5> หน่วย</div>
                    </div>
                </div>
                <div class=""d-flex my-xl-auto right-content"">
                    <div class=""mb-6 mb-xl-0"" style=""margin-right: 20px;"">
                        <button type=""button"" id=""btn_downloadtemplate"" target=""_blank"" class=""btn btn-outline-primary btn-block"">Download Template</button>
                    </div>
                    <div class=""mb-6 mb-xl-0"">
                        <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                    </div>
                </div>
            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col-12"">
                        <d");
            WriteLiteral("iv class=\"card card-primary\">\r\n                            <div class=\"card-body\">\r\n                                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66532bed3adda24f61f275eaf781042de6c5c2317282", async() => {
                WriteLiteral(@"
                                    <div class=""form-group step1"">
                                        <div class=""row"">
                                            <div class=""col-md-2 text-xl-right"" style=""margin-top:5px;"">
                                                <label class=""form-label"">สาขาต้นทาง<span class=""tx-danger"">*</span></label>
                                            </div>
                                            <div class=""col-md-3"">
                                                <select class=""form-control branch"" id=""start_branch"" name=""start_branch"" data-width=""100%"" required>
                                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66532bed3adda24f61f275eaf781042de6c5c2318243", async() => {
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
                                            </div>
                                            <div class=""col-md-2 text-xl-right"" style=""margin-top:5px;"">
                                                <label class=""form-label"">สาขาปลายทาง <span class=""tx-danger"">*</span></label>
                                            </div>
                                            <div class=""col-md-3"">
                                                <select class=""form-control branch"" id=""end_branch"" name=""end_branch"" data-width=""100%"" required>
                                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "66532bed3adda24f61f275eaf781042de6c5c23110102", async() => {
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
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""form-group step2"">
                                        <div class=""row"">
                                            <div class=""col-md-2 text-xl-right"" style=""margin-top:5px;"">
                                                <label class=""form-label"">File Upload <span class=""tx-danger"">*</span></label>
                                            </div>
                                            <div class=""col-md-8"">
                                                <div class=""custom-file"">
                                                    <input class=""custom-file-input"" id=""customFile"" type=""file"" required> <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                                                </div>
             ");
                WriteLiteral("                               </div>\r\n");
                WriteLiteral("                                        </div>\r\n                                    </div>\r\n                                ");
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
                    <div class=""col-12 tbl-return-import d-none"">
                        <div class=""card card-success"">
                            <div class=""card-body"">
                                <table id=""tbl-return_import"" class=""table table-striped table-hover mg-b-0 text-md-nowrap"" width=""100%"">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>STATUS</th>
                                            <th></th>
                                            <th>BARCODE</th>
                                            <th>CODE</th>
                                            <th>NAME</th>
                                            <th>UOM</th>
                                            <th>QTY</th>
                                            <th>PR");
            WriteLiteral(@"ICE</th>
                                            <th>ZONE</th>
                                            <th>LOG</th>
                                            <th>BRANCH</th>
                                            <th>ID</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>

");
            WriteLiteral(@"                        <div class=""col-sm-12"">
                                <button id=""btn_update-data"" class=""btn btn-outline-success btn-block btn_update-data"" type=""submit"">Export</button>
                            </div>
                    </div>
                </div>
            </div>
");
            WriteLiteral("        </div>\r\n    </div>\r\n</div>\r\n<!--End Scroll with content modal -->\r\n");
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