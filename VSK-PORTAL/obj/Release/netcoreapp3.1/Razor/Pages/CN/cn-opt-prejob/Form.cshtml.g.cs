#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\CN\cn-opt-prejob\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1798021953c3d12d5b323729e409e93c9a6366a0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.CN.cn_opt_prejob.Pages_CN_cn_opt_prejob_Form), @"mvc.1.0.view", @"/Pages/CN/cn-opt-prejob/Form.cshtml")]
namespace MIS_PORTAL.Pages.CN.cn_opt_prejob
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1798021953c3d12d5b323729e409e93c9a6366a0", @"/Pages/CN/cn-opt-prejob/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_CN_cn_opt_prejob_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("form-horizontal"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_data"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral("<div class=\"col-12 col-sm-12\">\r\n    <div class=\"card\">\r\n        <div class=\"card-header pb-0\">\r\n            <h5 class=\"card-title mb-0 pb-0\">สร้างรายการรับคืนสินค้า</h5>\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1798021953c3d12d5b323729e409e93c9a6366a05167", async() => {
                WriteLiteral(@"

                <div class=""row row-sm"">
                    <div class=""col-lg-3"">
                        <label for=""salefile_number"">เลขที่ใบเสร็จ: <span class=""tx-right-f""><a href=""#"" title=""ประวัติการรับคืนสินค้า"" data-toggle=""modal"" data-target=""#modal-frm_history""><i class=""fas fa-history""></i></a></span></label>
                        <input type=""text"" class=""form-control"" id=""salefile_number"" name=""salefile_number""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 750, "\"", 764, 0);
                EndWriteAttribute();
                WriteLiteral(@" required data-parsley-error-message="""">
                    </div>

                    <div class=""col-lg-7"">
                        <label for=""saletra_item_list"">รายการสินค้า:</label>
                        <select class=""form-control select2-no-search"" id=""saletra_item_list"" name=""saletra_item_list"" required data-parsley-error-message="""">
                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1798021953c3d12d5b323729e409e93c9a6366a06446", async() => {
                    WriteLiteral("-- เลือกสินค้า --");
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

                    <div class=""col-lg-2"">
                        <label for=""saletra_qty"">จำนวน:</label>
                        <input type=""number"" class=""form-control"" id=""saletra_qty"" name=""saletra_qty""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1467, "\"", 1481, 0);
                EndWriteAttribute();
                WriteLiteral(@" min=""0"" step=""1"" required data-parsley-error-message="""">
                    </div>


                </div>

                <div class=""row row-sm mg-t-15"">
                    <div class=""col-lg-3"">
                        <label for=""salefile_invcode"">รหัสลูกค้า:</label>
                        <input type=""text"" class=""form-control"" id=""salefile_invcode"" name=""salefile_invcode""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1877, "\"", 1891, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled required data-parsley-error-message="""">
                    </div>

                    <div class=""col-lg-7"">
                        <label for=""salefile_invname"">ลูกค้า:</label>
                        <input type=""text"" class=""form-control"" id=""salefile_invname"" name=""salefile_invname""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2197, "\"", 2211, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled required data-parsley-error-message="""">
                    </div>

                    <div class=""col-lg-2"">
                        <label for=""job_status"">สถานะ:</label>
                        <input type=""text"" class=""form-control"" id=""job_status"" name=""job_status""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2498, "\"", 2512, 0);
                EndWriteAttribute();
                WriteLiteral(@" value=""OPEN"" disabled style=""color:red; font-weight:bold;"">
                    </div>

                </div>

                <div class=""row row-sm mg-t-15"">
                    <div class=""col-lg-3"">
                        <label for=""cn_pre_job_type"">การแจ้งรับ:</label>
                        <select class=""form-control select2-no-search"" id=""cn_pre_job_type"" name=""cn_pre_job_type"" data-width=""100%"" required data-parsley-error-message=""""> </select>
                    </div>

                    <div class=""col-lg-7"">
                        <label for=""job_comment"">สาเหตุ</label>
                        <select class=""form-control select2"" id=""job_comment"" name=""job_comment"" data-width=""100%""");
                BeginWriteAttribute("required", " required=\"", 3236, "\"", 3247, 0);
                EndWriteAttribute();
                WriteLiteral(" data-parsley-error-message=\"\">\r\n                            ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1798021953c3d12d5b323729e409e93c9a6366a010648", async() => {
                    WriteLiteral("-- เลือกสาเหตุการรับคืน --");
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

                    <div class=""col-lg-2"">
                        <label for=""created_by"">บันทึกโดย:</label>
                        <input type=""text"" class=""form-control"" id=""created_by"" name=""created_by""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3639, "\"", 3653, 0);
                EndWriteAttribute();
                WriteLiteral(@" disabled>
                    </div>

                </div>
                <div class=""row row-sm mg-t-15"">
                    <div class=""col-lg-12"">
                        <label for=""cn_pre_job_type"">หมายเหตุ:</label>
                        <input type=""text"" class=""form-control"" id=""cn_pre_job_detail_remark"" name=""cn_pre_job_detail_remark""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4012, "\"", 4026, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                    </div>
                </div>


                <div class=""table-responsive mg-t-20"">
                    <table id=""tbl-list"" class=""table table-bordered table-striped table-hover mg-b-0 text-md-nowrap""></table>
                </div>
                <div class=""border-top my-3""></div>

                <div class=""form-group mb-0 mt-3 justify-content-end"" align=""right"">
                    <div>
                        <button type=""submit"" id=""btn-save_form"" class=""btn btn-md btn-primary"">บันทึก</button>
                        <button type=""reset"" class=""btn btn-md btn-secondary"" onClick=""window.location.reload();"">ยกเลิก</button>
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
            WriteLiteral("\r\n            \r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
